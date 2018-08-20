import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Shift } from './shifts/shift';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  private apiUrl = 'https://analogio.dk/shiftplanning/api';  // URL to web API

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getShifts(): Observable<Shift[]> {
    const url = `${this.apiUrl}/shifts`;
    return this.http.get(url, {headers: this.authService.createAuthorizationHeader()} ).pipe(
      tap((shifts: Shift[]) => {
        shifts.sort((n1,n2) => new Date(n1.start).getTime() - new Date(n2.start).getTime());
      }),
      catchError(this.handleError<Shift[]>('getShifts'))
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
