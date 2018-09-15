import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Employee } from './employees/employee';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://analogio.dk/shiftplanning/api';  // URL to web API

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getEmployee(id: number): Observable<Employee> {
    const url = `${this.apiUrl}/Employees/${id}`;
    return this.http.get(url, {headers: this.authService.createAuthorizationHeader()} ).pipe(
      tap((Employees: Employee) => {
      }),
      catchError(this.handleError<Employee>('getEmployees'))
    );
  }
  
  public getEmployees(): Observable<Employee[]> {
    return this.http.get(`${this.apiUrl}/employees`, {headers: this.authService.createAuthorizationHeader()} ).pipe(
      tap((Employees: Employee[]) => {
        
      }),
      catchError(this.handleError<Employee[]>('getEmployees'))
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
