import { ResponseMessage } from './../../../types';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { User } from '../../../types';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

const API_URL = 'http://localhost:3000/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ToastModule, ButtonModule, FormsModule],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}
  userData: User = {
    username: '',
    password: '',
  };

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  onRegister() {
    this.authService
      .registerUser(`${API_URL}/auth/registration`, this.userData)
      .subscribe({
        next: (response: ResponseMessage) => {
          this.showMessage(
            'success',
            'Success',
            `${response.message} Now you can log in`
          );
        },
        error: (e) => {
          console.log('Error creating user:', e.message);
          this.showMessage(
            'error',
            'Error',
            e?.error?.message || 'Error creating user'
          );
        },
      });
  }
}
