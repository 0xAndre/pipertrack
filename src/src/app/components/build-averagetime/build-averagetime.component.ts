import { Component } from '@angular/core';

// services
import { IpcService } from '../../../services/ipc.service';

@Component({
  selector: 'pipertrack-build-averagetime',
  standalone: false,

  templateUrl: './build-averagetime.component.html',
  styleUrl: './build-averagetime.component.css'
})
export class BuildAveragetimeComponent {
  private intervalId: any;
  private readonly intervalTime: number = 5000;

  isRefreshing: boolean = false;
  lastValue: number = 0;
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
    const response = await this._ipc.sendMessage('get-build-duration-avg', "");
    if (this.lastValue != response) {
      this.lastValue = response;
      this.isRefreshing = true;

      setTimeout(() => {
        this.isRefreshing = false;
      }, 1000);
    }
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
