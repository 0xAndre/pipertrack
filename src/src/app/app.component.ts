import { Component } from '@angular/core';

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

  constructor(private readonly _ipc: IpcService) { }

  async ngOnInit() {
    this.getData();
  }

  async getData() {
    const response = await this._ipc.sendMessage('get-teamprojects', "");
    if (response.length > 0) {
      this.isConfigured = true;
    }
  }
}
