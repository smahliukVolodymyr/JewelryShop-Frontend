import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../types';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SharedFormComponentComponent } from '../../components/shared-form-component/shared.form.component';
import { MyMessageService } from '../../services/my.message.service';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    RouterModule,
    ToastModule,
    ButtonModule,
    SharedFormComponentComponent,
  ],
  providers: [MyMessageService, MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private messageService: MyMessageService,
    private router: Router
  ) {}

  onLogin(userData: User) {
    this.authService.loginUser(userData).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (e) => {
        this.messageService.showMessage(
          'error',
          'Error',
          e.error?.message || 'Error logging in !'
        );
      },
    });
  }
}
