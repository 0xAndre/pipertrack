import { Component, OnInit, OnDestroy } from '@angular/core';

// services
import { IpcService } from '../../../services/ipc.service';

@Component({
  selector: 'pipertrack-build-running',
  templateUrl: './build-running.component.html',
  standalone: false,
  styleUrl: './build-running.component.css'
})
export class BuildRunningComponent implements OnInit, OnDestroy {

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
    const response = await this._ipc.sendMessage('get-running-builds', "");
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
