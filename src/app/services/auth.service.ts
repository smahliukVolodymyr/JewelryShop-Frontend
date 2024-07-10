import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ResponseMessage, Token, User } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginUser(url: string, body: User): Observable<Token> {
    return this.http.post<Token>(url, body);
  }
  registerUser(url: string, body: User): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(url, body);
  }
}
