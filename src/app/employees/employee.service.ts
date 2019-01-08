import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Employee } from './employee';
import { AuthService } from '../login/auth.service';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private apiUrl = 'https://analogio.dk/shiftplanning/api';  // URL to web API

    constructor(private http: HttpClient, private authService: AuthService) { }

    public getEmployee(id: number): Observable<Employee> {
        const url = `${this.apiUrl}/employees/${id}`;
        return this.http.get<Employee>(url, { headers: this.authService.createAuthorizationHeader() }).pipe(
            tap(data => console.log('getEmployee: ', data)),
            catchError(this.handleError)
        );
    }

    public getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiUrl}/employees`, { headers: this.authService.createAuthorizationHeader() }).pipe(
            tap(data => console.log('getEmployees: ', data)),
            catchError(this.handleError)
        );
    }

    public syncPodioEmployees(): Observable<any> {
        return this.http.get(`${this.apiUrl}/employees/podiosync?shortKey=analog`, { headers: this.authService.createAuthorizationHeader() }).pipe(
            tap(data => console.log('syncPodioEmployees: ', data)),
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
