import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pipertrack-settings',
  standalone: false,

  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  configForm: FormGroup;

  isLoading: boolean = false;

  constructor(private fb: FormBuilder) {
    this.configForm = this.fb.group({
      azureUrl: ['', Validators.required],
      azurePat: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Form Values:', this.configForm.value);
    this.isLoading = true;
  }
}
