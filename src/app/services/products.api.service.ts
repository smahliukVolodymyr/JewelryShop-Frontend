import { Product, ResponseMessage } from './../../types';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  private readonly API_URL = environment.apiUrl;
  private readonly API_PATH = environment.productPath;
  constructor(private http: HttpClient, private authService: AuthService) {}

  getProducts(): Observable<Product[]> {
    const headers = this.authService.generateHeader();
    return this.http.get<Product[]>(`${this.API_URL + this.API_PATH}`, {
      headers,
    });
  }
  deleteProduct(id: string): Observable<Product> {
    const headers = this.authService.generateHeader();
    return this.http.delete<Product>(`${this.API_URL + this.API_PATH}/${id}`, {
      headers,
    });
  }
  addProduct(product: Product): Observable<ResponseMessage> {
    const headers = this.authService.generateHeader();
    return this.http.post<ResponseMessage>(
      `${this.API_URL + this.API_PATH}`,
      product,
      {
        headers,
      }
    );
  }
  editProduct(product: Product): Observable<Product> {
    const headers = this.authService.generateHeader();
    return this.http.put<Product>(`${this.API_URL + this.API_PATH}`, product, {
      headers,
    });
  }
}
