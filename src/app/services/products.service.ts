import { BehaviorSubject } from 'rxjs';
import { MyMessageService } from './my.message.service';
import { ProductsApiService } from './products.api.service';
import { Product, SaleItem } from './../../types';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly productsSubject = new BehaviorSubject<Product[]>([]);
  readonly products$ = this.productsSubject.asObservable();

  constructor(
    private productsApiService: ProductsApiService,
    private myMessageService: MyMessageService
  ) {}

  getProducts() {
    this.productsApiService.getProducts().subscribe({
      next: (response: Product[]) => {
        this.productsSubject.next(response);
      },
      error: (e) => {
        this.myMessageService.showMessage(
          'error',
          'Error',
          e.error?.message || 'Error getting products!'
        );
      },
    });
  }

  deleteProduct(id: string) {
    this.productsApiService.deleteProduct(id).subscribe({
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
          e.error?.message || 'Error deleting product!'
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
          e.error?.message || 'Error editing product!'
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
          e.error?.message || 'Error adding product!'
        );
      },
    });
  }

  getUnsoldProducts(products: Product[], sales: SaleItem[]): Product[] {
    const soldProductIds: string[] = sales
      .map((sale) =>
        typeof sale.product === 'string' ? sale.product : sale.product._id
      )
      .filter((id): id is string => id !== undefined);
    return products.filter(
      (product) => product._id && !soldProductIds.includes(product._id)
    );
  }
}
