const axios = require('axios');
const fs = require('fs');
const path = require('path');

const storageService = require('./storageService');

const getAllTeamProjects = async () => {
    const config = await storageService.getStorageData();
    
    const headers = {
        'Authorization': `Basic ${Buffer.from(':' + config.azurePat).toString('base64')}`,
        'Content-Type': 'application/json'
    };

    const url = `${config.azureUrl}/_apis/projects?api-version=6.0`;
    
    try {
        const response = await axios.get(url, { headers });
        return response.data.value.map(project => project.name);
    } catch (error) {
        console.error('Error while fetching team projects:', error);
        return [];
    }
};

const getRunningBuilds = async () => {
    const config = await storageService.getStorageData();

    const headers = {
        'Authorization': `Basic ${Buffer.from(':' + config.azurePat).toString('base64')}`,
        'Content-Type': 'application/json'
    };

    let totalRunningBuilds = 0;

    for (const project of config.teamProjects) {
        const url = `${config.azureUrl}/${project}/_apis/build/builds?statusFilter=inProgress&api-version=6.0`;
        try {
            const response = await axios.get(url, { headers });
            totalRunningBuilds += response.data.count;
        } catch (error) {
            console.error(`Error while fetching builds for ${project}:`, error);
        }
    }

    return totalRunningBuilds;
};

const getBuildStats = async () => {
    const config = await storageService.getStorageData();

    const headers = {
        'Authorization': `Basic ${Buffer.from(':' + config.azurePat).toString('base64')}`,
        'Content-Type': 'application/json'
    };

    let successCount = 0;
    let failedCount = 0;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    for (const project of config.teamProjects) {
        const url = `${config.azureUrl}/${project}/_apis/build/builds?minTime=${yesterday.toISOString()}&resultFilter=Succeeded,Failed&api-version=6.0`;
        try {
            const response = await axios.get(url, { headers });
            response.data.value.forEach(build => {
                if (build.result === 'succeeded') successCount++;
                if (build.result === 'failed') failedCount++;
            });
        } catch (error) {
            console.error(`Error while fetching build stats for ${project}:`, error);
        }
    }

    return { successCount, failedCount };
};

const getActivePullRequests = async () => {
    const config = await storageService.getStorageData();

    const headers = {
        'Authorization': `Basic ${Buffer.from(':' + config.azurePat).toString('base64')}`,
        'Content-Type': 'application/json'
    };

    let totalActivePRs = 0;

    for (const project of config.teamProjects) {
        const url = `${config.azureUrl}/${project}/_apis/git/pullrequests?searchCriteria.status=active&api-version=6.0`;
        try {
            const response = await axios.get(url, { headers });
            totalActivePRs += response.data.count;
        } catch (error) {
            console.error(`Error while fetching pull requests for ${project}:`, error);
        }
    }

    return totalActivePRs;
};

const getRecentBugs = async () => {
    const config = await storageService.getStorageData();

    const headers = {
        'Authorization': `Basic ${Buffer.from(':' + config.azurePat).toString('base64')}`,
        'Content-Type': 'application/json'
    };

    let totalBugs = 0;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedDate = yesterday.toISOString().split('T')[0];

    for (const project of config.teamProjects) {
        const url = `${config.azureUrl}/${project}/_apis/wit/wiql?api-version=6.0`;
        const query = {
            query: `SELECT [System.Id] FROM WorkItems WHERE [System.WorkItemType] = 'Bug' AND [System.CreatedDate] >= '${formattedDate}'`
        };
        try {
            const response = await axios.post(url, query, { headers });
            totalBugs += response.data.workItems.length;
        } catch (error) {
            console.error(`Error while fetching bugs for ${project}:`, error);
        }
    }

    return totalBugs;
};

const getBuildDurationAvg = async () => {
    const config = await storageService.getStorageData();

    const headers = {
        'Authorization': `Basic ${Buffer.from(':' + config.azurePat).toString('base64')}`,
        'Content-Type': 'application/json'
    };

    let totalDuration = 0;
    let successCount = 0;

    for (const project of config.teamProjects) {
        const url = `${config.azureUrl}/${project}/_apis/build/builds?resultFilter=succeeded&api-version=6.0`;
        try {
            const response = await axios.get(url, { headers });
            response.data.value.forEach(build => {
                const startTime = new Date(build.startTime);
                const finishTime = new Date(build.finishTime);
                totalDuration += (finishTime - startTime) / 1000;
                successCount++;
            });
        } catch (error) {
            console.error(`Error while fetching successful builds for ${project}:`, error);
        }
    }

    return successCount > 0 ? totalDuration / successCount : 0;
};

const getBuildQueueTimeAvg = async () => {
    const config = await storageService.getStorageData();

    const headers = {
        'Authorization': `Basic ${Buffer.from(':' + config.azurePat).toString('base64')}`,
        'Content-Type': 'application/json'
    };

    let totalQueueTime = 0;
    let successCount = 0;

    for (const project of config.teamProjects) {
        const url = `${config.azureUrl}/${project}/_apis/build/builds?resultFilter=succeeded&api-version=6.0`;
        try {
            const response = await axios.get(url, { headers });
            response.data.value.forEach(build => {
                const queueTime = new Date(build.queueTime);
                const startTime = new Date(build.startTime);
                totalQueueTime += (startTime - queueTime) / 1000;
                successCount++;
            });
        } catch (error) {
            console.error(`Error while fetching queue time for ${project}:`, error);
        }
    }

    return successCount > 0 ? totalQueueTime / successCount : 0;
};

const getTopCommitUsers = async () => {
    const config = await storageService.getStorageData();

    const headers = {
        'Authorization': `Basic ${Buffer.from(':' + config.azurePat).toString('base64')}`,
        'Content-Type': 'application/json'
    };

    const commitCounts = {};
    const sinceDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();


    for (const project of config.teamProjects) {
        const url = `${config.azureUrl}/${project}/_apis/git/repositories?api-version=6.0`;
        try {
            const reposResponse = await axios.get(url, { headers });
            for (const repo of reposResponse.data.value) {
                const commitsUrl = `${repo.url}/commits?searchCriteria.fromDate=${sinceDate}&api-version=6.0`;
                const commitsResponse = await axios.get(commitsUrl, { headers });
                commitsResponse.data.value.forEach(commit => {
                    const author = commit.author.email;
                    commitCounts[author] = (commitCounts[author] || 0) + 1;
                });
            }
        } catch (error) {
            console.error(`Error while fetching commits for ${project}:`, error);
        }
    }

    return Object.entries(commitCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([user, count]) => ({ user, count }));
};

const getTopFailedBuilds = async () => {
    const config = await storageService.getStorageData();

    const headers = {
        'Authorization': `Basic ${Buffer.from(':' + config.azurePat).toString('base64')}`,
        'Content-Type': 'application/json'
    };

    const buildFailures = {};
    const sinceDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    for (const project of config.teamProjects) {
        const url = `${config.azureUrl}/${project}/_apis/build/builds?minTime=${sinceDate}&resultFilter=failed&api-version=6.0`;
        try {
            const buildsResponse = await axios.get(url, { headers });
            buildsResponse.data.value.forEach(build => {
                const buildName = build.definition.name;
                buildFailures[buildName] = (buildFailures[buildName] || 0) + 1;
            });
        } catch (error) {
            console.error(`Error while fetching failed builds for ${project}:`, error);
        }
    }

    return Object.entries(buildFailures)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }));
};

const getBuildStatsLast7Days = async () => {
    const config = await storageService.getStorageData();
    
    const headers = {
        'Authorization': `Basic ${Buffer.from(':' + config.azurePat).toString('base64')}`,
        'Content-Type': 'application/json'
    };

    const buildStats = {};

    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayString = date.toISOString().split('T')[0];
        buildStats[dayString] = { succeeded: 0, failed: 0 };
    }

    for (const project of config.teamProjects) {
        const url = `${config.azureUrl}/${project}/_apis/build/builds?minTime=${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()}&api-version=6.0`;
        try {
            const buildsResponse = await axios.get(url, { headers });
            buildsResponse.data.value.forEach(build => {
                const buildDate = build.startTime.split('T')[0];
                if (buildStats[buildDate]) {
                    if (build.result === 'succeeded') {
                        buildStats[buildDate].succeeded++;
                    } else if (build.result === 'failed') {
                        buildStats[buildDate].failed++;
                    }
                }
            });
        } catch (error) {
            console.error(`Error while fetching build stats for ${project}:`, error);
        }
    }
    return buildStats;
};

const getFailedReleasesCount = async () => {
    const config = await storageService.getStorageData();

    const headers = {
        'Authorization': `Basic ${Buffer.from(':' + config.azurePat).toString('base64')}`,
        'Content-Type': 'application/json'
    };

    let failedReleasesCount = 0;

    for (const project of config.teamProjects) {
        const url = `${config.azureUrl}/${project}/_apis/release/releases?api-version=6.0`;
        try {
            const releasesResponse = await axios.get(url, { headers });
            releasesResponse.data.value.forEach(release => {
                const environments = release.environments
                const isFailed = environments.some(environment => environment.status === 'failed');
                if (isFailed) {
                    failedReleasesCount++;
                }
            });
        } catch (error) {
            //console.error(`Error while fetching releases for ${project}:`, error);
        }
    }

    return failedReleasesCount;
};

const getSlowestCompletedBuilds = async () => {
    const config = await storageService.getStorageData();

    const headers = {
        'Authorization': `Basic ${Buffer.from(':' + config.azurePat).toString('base64')}`,
        'Content-Type': 'application/json'
    };

    const builds = [];
    const sinceDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    for (const project of config.teamProjects) {
        const url = `${config.azureUrl}/${project}/_apis/build/builds?minTime=${sinceDate}&resultFilter=succeeded&api-version=6.0`;
        try {
            const response = await axios.get(url, { headers });
            response.data.value.forEach(build => {
                const startTime = new Date(build.startTime);
                const finishTime = new Date(build.finishTime);
                const duration = (finishTime - startTime) / 1000;
                builds.push({ name: build.definition.name, duration });
            });
        } catch (error) {
            console.error(`Error getting builds from: ${project}:`, error);
        }
    }

    return builds.sort((a, b) => b.duration - a.duration).slice(0, 5);
};

const getAveragePullRequestClosureTime = async () => {
    const config = await storageService.getStorageData();

    const headers = {
        'Authorization': `Basic ${Buffer.from(':' + config.azurePat).toString('base64')}`,
        'Content-Type': 'application/json'
    };

    let totalDuration = 0;
    let prCount = 0;
    const sinceDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    for (const project of config.teamProjects) {
        const url = `${config.azureUrl}/${project}/_apis/git/pullrequests?searchCriteria.status=completed&api-version=6.0`;
        try {
            const response = await axios.get(url, { headers });
            response.data.value.forEach(pr => {
                const creationTime = new Date(pr.creationDate);
                const closeTime = new Date(pr.closedDate);
                totalDuration += (closeTime - creationTime) / 1000 / 60;
                prCount++;
            });
        } catch (error) {
            console.error(`Erro ao obter pull requests para ${project}:`, error);
        }
    }

    return prCount > 0 ? totalDuration / prCount : 0;
};

const getBugCountBySeverity = async () => {
    const config = await storageService.getStorageData();

    const headers = {
        'Authorization': `Basic ${Buffer.from(':' + config.azurePat).toString('base64')}`,
        'Content-Type': 'application/json'
    };

    const bugCounts = {};
    const batchSize = 200;
    
    const severityColors = {
        low: '#339900',
        critical: '#D4002A',
        medium: '#FFCC00',
        high: '#FE9900'
    };

    for (const project of config.teamProjects) {
        try {
            let continuationToken = null;
            const bugIds = [];
            
            do {
                const bugsUrl = `${config.azureUrl}/${project}/_apis/wit/wiql?api-version=6.0`;
                const wiqlQuery = {
                    query: `SELECT [System.Id] FROM WorkItems WHERE [System.WorkItemType] = 'Bug' AND [System.TeamProject] = '${project}' ORDER BY [System.Id] ASC`
                };
                
                const bugResponse = await axios.post(bugsUrl, wiqlQuery, { headers });
                const workItems = bugResponse.data.workItems || [];
                bugIds.push(...workItems.map(item => item.id));
                
                continuationToken = bugResponse.data.continuationToken || null;
            } while (continuationToken);

            for (let i = 0; i < bugIds.length; i += batchSize) {
                const batchIds = bugIds.slice(i, i + batchSize);
                const workItemDetailsUrl = `${config.azureUrl}/${project}/_apis/wit/workitems?ids=${batchIds.join(',')}&fields=Microsoft.VSTS.Common.Severity&api-version=6.0`;
                const workItemDetailsResponse = await axios.get(workItemDetailsUrl, { headers });
                const workItemsDetails = workItemDetailsResponse.data.value || [];
                
                workItemsDetails.forEach(workItem => {
                    const severity = workItem.fields["Microsoft.VSTS.Common.Severity"] || 'Unknown';
                    bugCounts[severity] = (bugCounts[severity] || 0) + 1;
                });
            }
        } catch (error) {
            console.error(`Error getting bugs from: ${project}:`, error);
        }
    }

    return Object.entries(bugCounts).map(([severity, count]) => {
        const severityKey = Object.keys(severityColors).find(key => severity.toLowerCase().includes(key)) || 'unknown';
        return { severity, count, color: severityColors[severityKey] || '#000000' };
    });
};



module.exports = {
    getAllTeamProjects,
    getRunningBuilds,
    getBuildStats,
    getActivePullRequests,
    getRecentBugs,
    getBuildDurationAvg,
    getBuildQueueTimeAvg,
    getTopCommitUsers,
    getTopFailedBuilds,
    getBuildStatsLast7Days,
    getFailedReleasesCount,
    getSlowestCompletedBuilds,
    getAveragePullRequestClosureTime,
    getBugCountBySeverity
};