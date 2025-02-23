import { Component } from '@angular/core';

// globals
import { AppGlobals } from '../../app.globals';

// services
import { IpcService } from '../../../services/ipc.service';

@Component({
  selector: 'pipetrack-average-pullrequest-closuretime',
  standalone: false,

  templateUrl: './average-pullrequest-closuretime.component.html',
  styleUrl: './average-pullrequest-closuretime.component.css'
})
export class AveragePullrequestClosuretimeComponent {
  private intervalId: any;
  private readonly intervalTime: number = 5000;

  isRefreshing: boolean = false;
  lastValue: number = 0;
  initializing: boolean = true;

  constructor(private readonly _ipc: IpcService, public appGlobals: AppGlobals) { }

  async ngOnInit() {
    this.getData();
    this.startAutoUpdate();
  }

  ngOnDestroy() {
    this.stopAutoUpdate();
  }

  async getData() {
    const response = await this._ipc.sendMessage('get-average-pullrequest-closuretime', "");
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
