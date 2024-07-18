import { Product, ResponseMessage } from './../../types';
import { AuthService } from './auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  private API_URL = 'http://localhost:3000/api/products';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getProducts(): Observable<Product[]> {
    const headers = this.authService.generateHeader();
    return this.http.get<Product[]>(`${this.API_URL}/get`, {
      headers,
    });
  }
  deleteProduct(id: string): Observable<Product> {
    const headers = this.authService.generateHeader();
    return this.http
      .delete<Product>(`${this.API_URL}/delete/${id}`, {
        headers,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
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
