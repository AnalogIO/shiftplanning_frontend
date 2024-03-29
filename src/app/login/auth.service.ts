import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LoginResponse } from './loginresponse';

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

        if (token === null) return false;

        if (now < expiry) return true;
        else return false
    }

    public createAuthorizationHeader(): HttpHeaders {
        return new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.getToken() })
    }

    private setToken(token: string): void {
      token = 'bearer ' + token;
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
        if (expiry === null) return 0;
        return parseInt(expiry);
    }

    public login(username: string, password: string): Observable<LoginResponse> {
        const url = `${this.apiUrl}/account/login`;
        return this.http.post<LoginResponse>(url, { username: username, password: password }, httpOptions).pipe(
            tap((loginresponse: LoginResponse) => {
                this.setToken(loginresponse.token);
                this.setExpiry(loginresponse.expires);
                console.log('login: ', loginresponse)
            }),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.error.message}`;
        }
        console.error(errorMessage, err);
        return throwError(errorMessage);
    }
}
