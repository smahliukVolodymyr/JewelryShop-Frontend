import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [ButtonModule, RouterModule, FooterComponent],
  templateUrl: './page.not.found.component.html',
  styleUrl: './page.not.found.component.scss',
})
export class PageNotFoundComponent {}
