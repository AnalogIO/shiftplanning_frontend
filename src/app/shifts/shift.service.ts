import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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
    return this.http.get(url, { headers: this.authService.createAuthorizationHeader() }).pipe(
      tap((shifts: Shift) => {
      }),
      catchError(this.handleError<Shift>('getShifts'))
    );
  }

  public getShifts(): Observable<Shift[]> {
    var today = new Date().toISOString().slice(0, 10) + "T00:00:00";
    const url = `${this.apiUrl}/shifts?from=${today}&to=2099-01-01T00:00:00`;
    return this.http.get(url, { headers: this.authService.createAuthorizationHeader() }).pipe(
      tap((shifts: Shift[]) => {
        shifts.sort((n1, n2) => new Date(n1.start).getTime() - new Date(n2.start).getTime());
      }),
      catchError(this.handleError<Shift[]>('getShifts'))
    );
  }

  public deleteShift(id: number): Observable<any> {
    const url = `${this.apiUrl}/shifts/${id}`;
    return this.http.delete(url, { headers: this.authService.createAuthorizationHeader() }).pipe(
      tap(_ => {
        console.log(`Deleted shift with id ${id}`);
      }),
      catchError(this.handleError<Shift>('deleteShift'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
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
