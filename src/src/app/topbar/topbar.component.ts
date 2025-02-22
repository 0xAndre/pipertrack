import { Component } from '@angular/core';

// globals
import { AppGlobals } from '../app.globals';

// services
import { IpcService } from '../../services/ipc.service';

@Component({
  selector: 'pipertrack-topbar',
  standalone: false,
  
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  constructor(private readonly _ipc: IpcService, public appGlobals: AppGlobals) { }

  async maximize() {
    await this._ipc.sendMessage('toggle-fullscreen', "");
  }

  openSettings() {
    this.appGlobals.showSettings = !this.appGlobals.showSettings;
  }
}
