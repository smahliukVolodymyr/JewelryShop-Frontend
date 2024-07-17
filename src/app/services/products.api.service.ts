import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product, ResponseMessage } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  API_URL = 'http://localhost:3000/api/products';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getProducts(): Observable<Product[]> {
    const headers = this.authService.generateHeader();
    return this.http.get<Product[]>(`${this.API_URL}/get`, {
      headers,
    });
  }
  deleteProduct(id: string): Observable<Product> {
    const headers = this.authService.generateHeader();
    return this.http.delete<Product>(`${this.API_URL}/delete/${id}`, {
      headers,
    });
  }
  addProduct(product: Product): Observable<ResponseMessage> {
    const headers = this.authService.generateHeader();
    return this.http.post<ResponseMessage>(`${this.API_URL}/add`, product, {
      headers,
    });
  }
  editProduct(product: Product): Observable<Product> {
    const headers = this.authService.generateHeader();
    return this.http.put<Product>(`${this.API_URL}/edit/`, product, {
      headers,
    });
  }
}
