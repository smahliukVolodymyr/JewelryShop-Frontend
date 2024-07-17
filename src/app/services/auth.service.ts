import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMessage, Token, User } from '../../types';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = 'http://localhost:3000/api/auth';
  tokenKey = 'token';

  constructor(private http: HttpClient) {}

  loginUser(body: User): Observable<Token> {
    return this.http.post<Token>(`${this.API_URL}/login`, body).pipe(
      map((response: any) => {
        if (!response?.token) {
          throw new Error('No token found in response');
        }
        this.setToken(response.token);
        return response;
      })
    );
  }
  registerUser(body: User): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.API_URL}/registration`,
      body
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  generateHeader(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
