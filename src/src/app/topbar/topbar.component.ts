import { Component } from '@angular/core';

// services
import { IpcService } from '../../services/ipc.service';

@Component({
  selector: 'pipertrack-topbar',
  standalone: false,
  
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  constructor(private readonly _ipc: IpcService) { }

  async maximize() {
    await this._ipc.sendMessage('toggle-fullscreen', "");
  }
}
