import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMessage, SaleItem } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class SalesApiService {
  private readonly API_URL = 'http://localhost:3000/api/sales';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getSales(): Observable<SaleItem[]> {
    const headers = this.authService.generateHeader();
    return this.http.get<SaleItem[]>(`${this.API_URL}/get`, { headers });
  }

  editSaleleItem(item: SaleItem): Observable<SaleItem> {
    const headers = this.authService.generateHeader();
    return this.http.put<SaleItem>(`${this.API_URL}/edit`, item, { headers });
  }
  addSaleItem(item: SaleItem): Observable<ResponseMessage> {
    const headers = this.authService.generateHeader();
    return this.http.post<ResponseMessage>(`${this.API_URL}/add`, item, {
      headers,
    });
  }
  deleteSaleItem(id: string): Observable<SaleItem> {
    const headers = this.authService.generateHeader();
    return this.http.delete<SaleItem>(`${this.API_URL}/delete/${id}`, {
      headers,
    });
  }
}
