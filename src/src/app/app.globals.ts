import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AppGlobals {
    public showSettings: boolean = true;

    // components
    public showActivePullRequestsComponents: boolean = true;
    public showPullRequestClosureTimeComponents: boolean = true;
    public showBugsBySeverityComponents: boolean = true;
    public showBugsCreatedComponents: boolean = true;
    public showBuildAverageTimeComponents: boolean = true;
    public showBuildQueuingTimeComponents: boolean = true;
    public showBuildRunningComponents: boolean = true;
    public showBuildRunningChartComponents: boolean = true;
    public showBuildStatusComponents: boolean = true;
    public showFailedReleasesComponents: boolean = true;
    public showMostCommitDeveloperComponents: boolean = true;
    public showMostFailedBuildsComponents: boolean = true;
    public showSlowestCompletedBuildsComponents: boolean = true;

    setAllComponentsTrue(): void {
        Object.keys(this).forEach((key) => {
            if (key.endsWith('Components') && typeof (this as any)[key] === 'boolean') {
                (this as any)[key] = true;
            }
        });
    }
}