import { Component } from '@angular/core';

// services
import { IpcService } from '../../../services/ipc.service';


@Component({
  selector: 'pipertrack-most-failed-builds',
  standalone: false,

  templateUrl: './most-failed-builds.component.html',
  styleUrl: './most-failed-builds.component.css'
})
export class MostFailedBuildsComponent {
  private intervalId: any;
  private readonly intervalTime: number = 5000;

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
    const response = await this._ipc.sendMessage('get-top-failed-builds', "");
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
