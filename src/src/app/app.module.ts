import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgApexchartsModule } from "ng-apexcharts";
import { MultiSelectModule } from 'primeng/multiselect';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { BuildStatusComponent } from './components/build-status/build-status.component';
import { BuildRunningComponent } from './components/build-running/build-running.component';
import { BuildRunningChartComponent } from './components/build-running-chart/build-running-chart.component';
import { ActivePullrequestsComponent } from './components/active-pullrequests/active-pullrequests.component';
import { BuildAveragetimeComponent } from './components/build-averagetime/build-averagetime.component';
import { BugsCreatedComponent } from './components/bugs-created/bugs-created.component';
import { FailedReleasesComponent } from './components/failed-releases/failed-releases.component';
import { MostFailedBuildsComponent } from './components/most-failed-builds/most-failed-builds.component';
import { MostCommitDeveloperComponent } from './components/most-commit-developer/most-commit-developer.component';
import { BuildQueuingTimeComponent } from './components/build-queuing-time/build-queuing-time.component';

// services
import { IpcService } from './../services/ipc.service';
import { SlowestCompletedBuildsComponent } from './components/slowest-completed-builds/slowest-completed-builds.component';
import { AveragePullrequestClosuretimeComponent } from './components/average-pullrequest-closuretime/average-pullrequest-closuretime.component';
import { BugsBySeverityComponent } from './components/bugs-by-severity/bugs-by-severity.component';
import { SettingsComponent } from './settings/settings.component';

// global
import { AppGlobals } from './app.globals';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    BuildStatusComponent,
    BuildRunningComponent,
    BuildRunningChartComponent,
    ActivePullrequestsComponent,
    BuildAveragetimeComponent,
    BugsCreatedComponent,
    FailedReleasesComponent,
    MostFailedBuildsComponent,
    MostCommitDeveloperComponent,
    BuildQueuingTimeComponent,
    SlowestCompletedBuildsComponent,
    AveragePullrequestClosuretimeComponent,
    BugsBySeverityComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [IpcService, AppGlobals],
  bootstrap: [AppComponent]
})
export class AppModule { }
