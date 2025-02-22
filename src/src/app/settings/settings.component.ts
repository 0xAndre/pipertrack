import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// services
import { IpcService } from '../../services/ipc.service';

@Component({
  selector: 'pipertrack-settings',
  standalone: false,

  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  configForm: FormGroup;

  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private readonly _ipc: IpcService) {
    this.configForm = this.fb.group({
      azureUrl: ['', Validators.required],
      azurePat: ['', Validators.required]
    });
  }

  async onSubmit() {
    console.log('Form Values:', this.configForm.value);
    this.isLoading = true;
    const response = await this._ipc.sendMessage('save-credentials', this.configForm.value);

    if(response.length == 0) {
      console.log('error')
    }

    console.log(response)

    this.isLoading = false;
  }
}
