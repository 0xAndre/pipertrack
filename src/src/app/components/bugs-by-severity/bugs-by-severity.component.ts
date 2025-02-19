import { Component } from '@angular/core';

// services
import { IpcService } from '../../../services/ipc.service';

@Component({
  selector: 'pipertrack-bugs-by-severity',
  standalone: false,

  templateUrl: './bugs-by-severity.component.html',
  styleUrl: './bugs-by-severity.component.css'
})
export class BugsBySeverityComponent {
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
    const response = await this._ipc.sendMessage('get-bug-count-by-severity', "");
    this.lastValue = response;
    const total = this.lastValue.reduce((sum, item) => sum + item.count, 0);
    this.lastValue = this.lastValue.map(item => ({
      ...item,
      percentage: ((item.count / total) * 100).toFixed(0) + '%'
    }));
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
