import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {LoginResponse} from './login/loginresponse';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private apiUrl = 'https://analogio.dk/shiftplanning/api';  // URL to web API

  constructor(private http: HttpClient) { }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    const expiry = this.getExpiry();
    const now = new Date().getTime() / 1000;

    if(token === null) return false;

    if(now < expiry) return true;
    else return false
  }

  public createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.getToken() })
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private getToken(): string {
    return localStorage.getItem('token');
  }

  private setExpiry(expiry: number): void {
    const t = new Date().getTime() / 1000;
    localStorage.setItem('expiry', (t + expiry).toString());
  }

  private getExpiry(): number {
    const expiry = localStorage.getItem('expiry');
    if(expiry === null) return 0;
    return parseInt(expiry);
  }

  public login(username: string, password: string): Observable<LoginResponse> {
    const url = `${this.apiUrl}/account/login`;
    return this.http.post(url, {username: username, password: password}, httpOptions).pipe(
      tap((loginresponse: LoginResponse) => {
        this.setToken(loginresponse.token);
        this.setExpiry(loginresponse.expires);
      }),
      catchError(this.handleError<LoginResponse>('login'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
