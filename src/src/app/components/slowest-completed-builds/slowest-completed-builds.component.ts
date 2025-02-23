import { Component } from '@angular/core';

// globals
import { AppGlobals } from '../../app.globals';

// services
import { IpcService } from '../../../services/ipc.service';

@Component({
  selector: 'pipertrack-slowest-completed-builds',
  standalone: false,

  templateUrl: './slowest-completed-builds.component.html',
  styleUrl: './slowest-completed-builds.component.css'
})
export class SlowestCompletedBuildsComponent {
  private intervalId: any;
  private readonly intervalTime: number = 50000;

  isRefreshing: boolean = false;
  lastValue!: any[];
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
    const response = await this._ipc.sendMessage('get-slowest-completed-builds', "");
    this.lastValue = response;
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
