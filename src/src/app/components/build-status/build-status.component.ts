import { Component } from '@angular/core';

// services
import { IpcService } from '../../../services/ipc.service';

@Component({
  selector: 'pipertrack-build-status',
  standalone: false,

  templateUrl: './build-status.component.html',
  styleUrl: './build-status.component.css'
})
export class BuildStatusComponent {
  private intervalId: any;
  private readonly intervalTime: number = 5000;
  initializing: boolean = true;

  buildStats: any;

  constructor(private readonly _ipc: IpcService) { }

  async ngOnInit() {
    this.getData();
    this.startAutoUpdate();
  }

  ngOnDestroy() {
    this.stopAutoUpdate();
  }

  async getData() {
    const response = await this._ipc.sendMessage('get-build-stats', "");
    this.buildStats = response;
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
