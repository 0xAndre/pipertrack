import { Component } from '@angular/core';

// globals
import { AppGlobals } from '../../app.globals';

// services
import { IpcService } from '../../../services/ipc.service';

import { ChartComponent, ApexChart, ApexDataLabels, ApexLegend, ApexNonAxisChartSeries, ApexFill, ApexStroke } from 'ng-apexcharts';


@Component({
  selector: 'pipertrack-bugs-created',
  standalone: false,

  templateUrl: './bugs-created.component.html',
  styleUrl: './bugs-created.component.css'
})
export class BugsCreatedComponent {
  series: ApexNonAxisChartSeries = [60, 40];
  chart: ApexChart = {
    type: 'donut',
  };
  labels = ['Created', 'Done'];
  legend: ApexLegend = {
    labels: {
      colors: '#ffffff',
    },
  };
  dataLabels: ApexDataLabels = {
    style: {
      colors: ['#ffffff'],
    },
    formatter: (val, opts) => {
      return opts.w.config.series[opts.seriesIndex];
    }
  };
  fill: ApexFill = {
    colors: ['#3366FF', '#339900'],
  };
  stroke: ApexStroke = {
    width: 2,
    colors: ['#404040'],
  };

  private intervalId: any;
  private readonly intervalTime: number = 60000;
  initializing: boolean = true;

  constructor(private readonly _ipc: IpcService, public appGlobals: AppGlobals) {

  }

  async ngOnInit() {
    this.getData();
    this.startAutoUpdate();
  }

  async getData() {
    const bugsCreated = await this._ipc.sendMessage('get-recent-bugs', "");
    const bugsDone = await this._ipc.sendMessage('get-bugs-done', "");
    this.series = [bugsCreated, bugsDone];
    this.initializing = false;
  }

  startAutoUpdate() {
    this.intervalId = setInterval(() => {
      this.getData();
    }, this.intervalTime);
  }

  stopAutoUpdate() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
