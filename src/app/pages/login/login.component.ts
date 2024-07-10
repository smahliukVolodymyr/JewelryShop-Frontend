import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Token, User } from '../../../types';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

const API_URL = 'http://localhost:3000/api';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [RouterModule, FormsModule, ToastModule, ButtonModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
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

  onLogin() {
    this.authService
      .loginUser(`${API_URL}/auth/login`, this.userData)
      .subscribe({
        next: (response: Token) => {
          // this.showMessage('success', 'Success', 'Login successful');
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
          this.showMessage(
            'error',
            'Error',
            'Error logging in ! (incorrect login or password)'
          );
        },
      });
  }
}
