import { MyMessageService } from './../../services/my.message.service';
import { ProductsApiService } from './../../services/products.api.service';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../../types';
import { ProductsPopupComponent } from '../products-popup/products.popup.component';
import { ProductsService } from '../../services/products.service';
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
  ],
  providers: [ProductsService],
  templateUrl: './products.table.component.html',
  styleUrl: './products.table.component.scss',
})
export class ProductsTableComponent {
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
