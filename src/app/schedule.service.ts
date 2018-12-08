import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Schedule } from './schedules/schedule';
import { ScheduledShift } from './schedules/scheduledShift';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private apiUrl = 'https://analogio.dk/shiftplanning/api';  // URL to web API

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getSchedule(id: number): Observable<Schedule> {
    const url = `${this.apiUrl}/schedules/${id}`;
    return this.http.get(url, {headers: this.authService.createAuthorizationHeader()} ).pipe(
      tap((schedule: Schedule) => {
      }),
      catchError(this.handleError<Schedule>('getSchedules'))
    );
  }
  
  public getSchedules(): Observable<Schedule[]> {
    const url = `${this.apiUrl}/schedules`;
    return this.http.get(url, {headers: this.authService.createAuthorizationHeader()} ).pipe(
      tap((schedules: Schedule[]) => {
      }),
      catchError(this.handleError<Schedule[]>('getSchedules'))
    );
  }

  public createSchedule(name: string, numberOfWeeks: number): Observable<Schedule>  {
    const url = `${this.apiUrl}/schedules`;
    return this.http.post(url, {name: name, numberOfWeeks: numberOfWeeks}, {headers: this.authService.createAuthorizationHeader()} ).pipe(
      tap(_ => console.log(`created schedule name=${name} numberOfWeeks=${numberOfWeeks}`)),
      catchError(this.handleError<any>('createSchedule'))
    );
  }

  public createScheduledShift(scheduleId: number, scheduledShift: ScheduledShift): Observable<ScheduledShift>  {
    const url = `${this.apiUrl}/schedules/${scheduleId}`;
    return this.http.post(url, scheduledShift, {headers: this.authService.createAuthorizationHeader()} ).pipe(
      tap(_ => console.log(`created scheduledShift scheduleId=${scheduleId}`)),
      catchError(this.handleError<any>('createScheduledShift'))
    );
  }

  public updateScheduledShift(scheduleId: number, scheduledShift: ScheduledShift): Observable<any> {
    const url = `${this.apiUrl}/schedules/${scheduleId}/${scheduledShift.id}`;
    return this.http.put(url, scheduledShift, {headers: this.authService.createAuthorizationHeader()}).pipe(
      tap(_ => console.log(`updated scheduledshift id=${scheduledShift.id}`)),
      catchError(this.handleError<any>('updateScheduledShift'))
    );
  }

  public deleteScheduledShift(scheduleId: number, scheduledShiftId: number): Observable<any> {
    const url = `${this.apiUrl}/schedules/${scheduleId}/${scheduledShiftId}`;
    return this.http.delete(url, {headers: this.authService.createAuthorizationHeader()}).pipe(
      tap(_ => console.log(`deleted scheduledshift id=${scheduledShiftId}`)),
      catchError(this.handleError<any>('deleteScheduledShift'))
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
