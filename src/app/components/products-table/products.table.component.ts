import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { MyMessageService } from './../../services/my.message.service';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProductsApiService } from '../../services/products.api.service';
import { Product } from '../../../types';
import { ProductsPopupComponent } from '../products-popup/products-popup.component';
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
  providers: [MyMessageService, MessageService],
  templateUrl: './products.table.component.html',
  styleUrl: './products.table.component.scss',
})
export class ProductsTableComponent {
  constructor(
    private productsApiService: ProductsApiService,
    private myMessageService: MyMessageService
  ) {}

  products: Product[] = [];

  ngOnInit() {
    this.getProducts();
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

  getProducts() {
    this.productsApiService.getProducts().subscribe({
      next: (response: Product[]) => {
        this.products = response;
      },
      error: (err) => {
        this.myMessageService.showMessage(
          'error',
          'Error',
          err?.message || 'Error getting products!'
        );
      },
    });
  }

  deleteProduct(product: Product) {
    this.productsApiService.deleteProduct(product._id!).subscribe({
      next: () => {
        this.myMessageService.showMessage(
          'success',
          'Success',
          'Product was deleted'
        );
        this.getProducts();
      },
      error: (e) => {
        this.myMessageService.showMessage(
          'error',
          'Error',
          e.error.message || 'Error deleting product!'
        );
      },
    });
  }
  editProduct(product: Product) {
    this.productsApiService.editProduct(product).subscribe({
      next: () => {
        this.myMessageService.showMessage(
          'success',
          'Success',
          'Product data was changed'
        );
        this.getProducts();
      },
      error: (e) => {
        this.myMessageService.showMessage(
          'error',
          'Error',
          e.error.message || 'Error editing product!'
        );
      },
    });
  }
  addProduct(product: Product) {
    this.productsApiService.addProduct(product).subscribe({
      next: () => {
        this.myMessageService.showMessage(
          'success',
          'Success',
          'New product was created'
        );
        this.getProducts();
      },
      error: (e) => {
        this.myMessageService.showMessage(
          'error',
          'Error',
          e.error.message || 'Error adding product!'
        );
      },
    });
  }
}
