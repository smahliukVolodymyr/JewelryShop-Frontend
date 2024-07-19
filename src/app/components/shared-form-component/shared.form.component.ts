import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../types';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-shared-form-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonModule],
  templateUrl: './shared.form.component.html',
  styleUrl: './shared.form.component.scss',
})
export class SharedFormComponentComponent {
  @Output() submitForm: EventEmitter<User> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  private validators = [
    Validators.required,
    Validators.minLength(4),
    Validators.pattern('^[a-zA-Z0-9]+$'),
  ];
  authForm: FormGroup = this.formBuilder.group({
    username: ['', this.validators],
    password: ['', this.validators],
  });

  get username() {
    return this.authForm.get('username');
  }

  get password() {
    return this.authForm.get('password');
  }

  getErrorMessages(controlName: string): string[] {
    const controlErrors = this.authForm.get(controlName)?.errors;
    const errorMessages: string[] = [];
    if (controlErrors) {
      if (controlErrors['required']) {
        errorMessages.push('Field cannot be empty.');
      }
      if (controlErrors['minlength']) {
        errorMessages.push('Minimum length is 4 characters.');
      }
      if (controlErrors['pattern']) {
        errorMessages.push('Fields must contain only alphanumeric characters');
      }
    }
    return errorMessages;
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.submitForm.emit(this.authForm.value);
      this.authForm.reset();
    }
  }
}
