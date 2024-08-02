import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMessage, SaleItem } from '../../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalesApiService {
  private readonly API_URL = environment.apiUrl;
  private readonly API_PATH = environment.salesPath;
  constructor(private http: HttpClient, private authService: AuthService) {}

  getSales(): Observable<SaleItem[]> {
    const headers = this.authService.generateHeader();
    return this.http.get<SaleItem[]>(`${this.API_URL + this.API_PATH}`, {
      headers,
    });
  }

  editSaleleItem(item: SaleItem): Observable<SaleItem> {
    const headers = this.authService.generateHeader();
    return this.http.put<SaleItem>(`${this.API_URL + this.API_PATH}`, item, {
      headers,
    });
  }
  addSaleItem(item: SaleItem): Observable<ResponseMessage> {
    const headers = this.authService.generateHeader();
    return this.http.post<ResponseMessage>(
      `${this.API_URL + this.API_PATH}`,
      item,
      {
        headers,
      }
    );
  }
  deleteSaleItem(id: string): Observable<SaleItem> {
    const headers = this.authService.generateHeader();
    return this.http.delete<SaleItem>(`${this.API_URL + this.API_PATH}/${id}`, {
      headers,
    });
  }
}
