import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Shift } from './shift';
import { AuthService } from '../login/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ShiftService {

    private apiUrl = 'https://analogio.dk/shiftplanning/api';  // URL to web API

    constructor(private http: HttpClient, private authService: AuthService) { }

    public getShift(id: number): Observable<Shift> {
        const url = `${this.apiUrl}/shifts/${id}`;
        return this.http.get<Shift>(url, { headers: this.authService.createAuthorizationHeader() }).pipe(
            tap(data => console.log('getShift: ', data)),
            catchError(this.handleError)
        );
    }

    public getShifts(): Observable<Shift[]> {
        var today = new Date().toISOString().slice(0, 10) + "T00:00:00";
        const url = `${this.apiUrl}/shifts?from=${today}&to=2099-01-01T00:00:00`;
        return this.http.get<Shift[]>(url, { headers: this.authService.createAuthorizationHeader() }).pipe(
            tap((shifts: Shift[]) => {
                shifts.sort((n1, n2) => new Date(n1.start).getTime() - new Date(n2.start).getTime());
                console.log('getShifts: ', shifts)
            }),
            catchError(this.handleError)
        );
    }

    public deleteShift(id: number): Observable<any> {
        const url = `${this.apiUrl}/shifts/${id}`;
        return this.http.delete(url, { headers: this.authService.createAuthorizationHeader() }).pipe(
            tap(_ => {
                console.log(`Deleted shift with id ${id}`);
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
