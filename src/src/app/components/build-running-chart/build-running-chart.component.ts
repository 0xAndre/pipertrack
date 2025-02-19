import { Component } from '@angular/core';

// services
import { IpcService } from '../../../services/ipc.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexStroke,
  ApexTitleSubtitle
} from "ng-apexcharts";

@Component({
  selector: 'pipertrack-build-running-chart',
  standalone: false,

  templateUrl: './build-running-chart.component.html',
  styleUrl: './build-running-chart.component.css'
})
export class BuildRunningChartComponent {
  chartSeries: ApexAxisChartSeries = [
    {
      name: "Succedded",
      data: [100, 43, 234, 342, 123, 434, 234, 921, 148],
      color: "#339900"
    }, {
      name: "Failed",
      data: [15, 50, 40, 60, 55, 70, 80, 100, 160],
      color: "#D4002A"
    }
  ];

  chartDetails: ApexChart = {
    type: "line",
    toolbar: {
      show: false
    }
  };

  chartTitle: ApexTitleSubtitle = {
    text: "",
    align: "left"
  };

  chartStroke: ApexStroke = {
    curve: "smooth",
    width: [3, 3]
  };

  chartXAxis: ApexXAxis = {
    categories: [],
    labels: {
      style: {
        colors: "#FFF"
      }
    }
  };

  chartColors: string[] = ["#339900", "#D4002A"];

  chartYAxis: ApexYAxis = {
    title: {
      text: "Builds",
      style: {
        color: "#FFF"
      }
    }
  };

  chartDataLabels: ApexDataLabels = {
    enabled: false
  };

  private intervalId: any;
  private readonly intervalTime: number = 60000;

  isRefreshing: boolean = false;
  lastValue!: any[];
  initializing: boolean = true;

  constructor(private readonly _ipc: IpcService) { }

  async ngOnInit() {
    this.getData();
    this.startAutoUpdate();
  }

  ngOnDestroy() {
    this.stopAutoUpdate();
  }

  async getData() {
    const response = await this._ipc.sendMessage('get-build-stats-last-7-days', "");
    this.lastValue = response;

    const categories = Object.keys(response); 
    const succeededData = categories.map(date => response[date].succeeded);
    const failedData = categories.map(date => response[date].failed);

    this.initializing = false;

    this.chartSeries = [
      {
        name: "Succeeded",
        data: succeededData,
        color: "#339900"
      },
      {
        name: "Failed",
        data: failedData,
        color: "#D4002A"
      }
    ];

    this.chartXAxis = {
      categories: categories,
      labels: {
        style: {
          fontSize: "8px",
          colors: "#FFF"
        }
      }
    };
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
