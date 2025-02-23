import { Component } from '@angular/core';

// globals
import { AppGlobals } from '../../app.globals';

// services
import { IpcService } from '../../../services/ipc.service';

@Component({
  selector: 'pipertrack-active-pullrequests',
  standalone: false,

  templateUrl: './active-pullrequests.component.html',
  styleUrl: './active-pullrequests.component.css'
})
export class ActivePullrequestsComponent {
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
    const response = await this._ipc.sendMessage('get-active-pull-requests', "");
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
