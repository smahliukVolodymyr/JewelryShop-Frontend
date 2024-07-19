import { MyMessageService } from './../../services/my.message.service';
import { ResponseMessage } from './../../../types';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { User } from '../../../types';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { FooterComponent } from '../../components/footer/footer.component';
import { SharedFormComponentComponent } from '../../components/shared-form-component/shared.form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    ToastModule,
    FooterComponent,
    SharedFormComponentComponent,
  ],
  providers: [MyMessageService, MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private messageService: MyMessageService
  ) {}

  onRegister(userData: User) {
    this.authService.registerUser(userData).subscribe({
      next: (response: ResponseMessage) => {
        this.messageService.showMessage(
          'success',
          'Success',
          `${response.message} Now you can log in`
        );
      },
      error: (e) => {
        this.messageService.showMessage(
          'error',
          'Error',
          e.error?.message || 'Error creating user'
        );
      },
    });
  }
}
