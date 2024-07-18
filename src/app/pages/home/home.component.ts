import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MaterialsTableComponent } from '../../components/materials-table/materials.table.component';
import { ProductsTableComponent } from '../../components/products-table/products.table.component';
import { SalesTableComponent } from '../../components/sales-table/sales.table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    MaterialsTableComponent,
    ProductsTableComponent,
    SalesTableComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
