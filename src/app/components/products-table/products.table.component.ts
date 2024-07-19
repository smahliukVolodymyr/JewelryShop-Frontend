import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../../types';
import { ProductsPopupComponent } from '../products-popup/products.popup.component';
import { ProductsService } from '../../services/products.service';
import { CustomCurrencyPipe } from '../../pipes/custom-currency.pipe';
import { MetricAdderPipe } from '../../pipes/metric-adder.pipe';
import { LengthModifierPipe } from '../../pipes/length-modifier.pipe';
@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    ToastModule,
    CommonModule,
    ProductsPopupComponent,
    PaginatorModule,
    MetricAdderPipe,
    LengthModifierPipe,
    CustomCurrencyPipe,
  ],
  providers: [ProductsService],
  templateUrl: './products.table.component.html',
  styleUrl: './products.table.component.scss',
})
export class ProductsTableComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];

  ngOnInit() {
    this.productsService.products$.subscribe(
      (response) => (this.products = response)
    );
    this.productsService.getProducts();
  }

  getMaterialsNames(product: Product): string {
    return product.materials
      .map((material) => {
        if (typeof material !== 'string') {
          return material.name;
        }
        return '';
      })
      .join(', ');
  }

  deleteProduct(product: Product) {
    this.productsService.deleteProduct(product._id!);
  }

  editProduct(product: Product) {
    this.productsService.editProduct(product);
  }

  addProduct(product: Product) {
    this.productsService.addProduct(product);
  }
}
