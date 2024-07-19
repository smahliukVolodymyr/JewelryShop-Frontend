import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMessage, Token, User } from '../../types';
import { map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/api/auth';
  private readonly tokenKey = 'token';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

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
    this.cookieService.delete(this.tokenKey, '/');
  }

  setToken(token: string): void {
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 8);
    this.cookieService.set(
      this.tokenKey,
      token,
      expiryDate,
      '/',
      '',
      true,
      'Strict'
    );
  }

  getToken(): string | null {
    return this.cookieService.get(this.tokenKey);
  }

  isLogedIn(): boolean {
    return this.cookieService.check(this.tokenKey);
  }
  generateHeader(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
