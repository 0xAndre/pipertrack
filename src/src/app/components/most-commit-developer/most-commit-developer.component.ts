import { Component } from '@angular/core';

// services
import { IpcService } from '../../../services/ipc.service';

@Component({
  selector: 'pipertrack-most-commit-developer',
  standalone: false,

  templateUrl: './most-commit-developer.component.html',
  styleUrl: './most-commit-developer.component.css'
})
export class MostCommitDeveloperComponent {
  private intervalId: any;
  private readonly intervalTime: number = 50000;

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
    const response = await this._ipc.sendMessage('get-top-commit-users', "");
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
