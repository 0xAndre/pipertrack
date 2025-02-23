import { Component } from '@angular/core';

// globals
import { AppGlobals } from './app.globals';

// services
import { IpcService } from '../services/ipc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  isConfigured: boolean = false;

  constructor(private readonly _ipc: IpcService, public appGlobals: AppGlobals) { }

  async ngOnInit() {
    this.getData();
  }

  async getData() {
    const response = await this._ipc.sendMessage('get-teamprojects', "");
    if (response.length == 0) {
      this.appGlobals.showSettings = true;
    } else {
      this.appGlobals.showSettings = false;
    }
  }
}
