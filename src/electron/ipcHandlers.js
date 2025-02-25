const { ipcMain, BrowserWindow, app } = require('electron');
const azureService = require('./services/azureService');
const storageService = require('./services/storageService');

module.exports = () => {
    ipcMain.handle('get-teamprojects', async () => {
        return await azureService.getAllTeamProjects();
    });

    ipcMain.handle('get-running-builds', async () => {
        return await azureService.getRunningBuilds();
    });

    ipcMain.handle('get-build-stats', async () => {
        return await azureService.getBuildStats();
    });

    ipcMain.handle('get-active-pull-requests', async () => {
        return await azureService.getActivePullRequests();
    });

    ipcMain.handle('get-recent-bugs', async () => {
        return await azureService.getRecentBugs();
    });

    ipcMain.handle('get-bugs-done', async () => {
        return await azureService.getDoneBugsLast24Hours();
    });

    ipcMain.handle('get-build-duration-avg', async () => {
        return await azureService.getBuildDurationAvg();
    });

    ipcMain.handle('get-build-queue-time-avg', async () => {
        return await azureService.getBuildQueueTimeAvg();
    });

    ipcMain.handle('get-top-commit-users', async () => {
        return await azureService.getTopCommitUsers();
    });

    ipcMain.handle('get-top-failed-builds', async () => {
        return await azureService.getTopFailedBuilds();
    });

    ipcMain.handle('get-build-stats-last-7-days', async () => {
        return await azureService.getBuildStatsLast7Days();
    });

    ipcMain.handle('get-failed-releases-count', async () => {
        return await azureService.getFailedReleasesCount();
    });

    ipcMain.handle('get-slowest-completed-builds', async () => {
        return await azureService.getSlowestCompletedBuilds();
    });

    ipcMain.handle('get-average-pullrequest-closuretime', async () => {
        return await azureService.getAveragePullRequestClosureTime();
    });

    ipcMain.handle('get-bug-count-by-severity', async () => {
        return await azureService.getBugCountBySeverity();
    });

    ipcMain.handle('toggle-fullscreen', (event) => {
        if (BrowserWindow.getAllWindows().length > 0) {
            let win = BrowserWindow.getAllWindows()[0];
            win.setFullScreen(!win.isFullScreen());
        }
    });

    ipcMain.handle('save-credentials', async (event, credentials) => {
        await storageService.saveCredentials(credentials);
        return await azureService.getAllTeamProjects();
    });

    ipcMain.handle('save-teamprojects', async (event, teamprojects) => {
        await storageService.saveTeamProjects(teamprojects);
        app.relaunch()
        app.exit()
    });

    ipcMain.handle('get-storage-data', async () => {
        return await storageService.getStorageData();
    });
};