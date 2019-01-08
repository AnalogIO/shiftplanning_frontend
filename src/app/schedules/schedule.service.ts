import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Schedule } from './schedule';
import { ScheduledShift } from './scheduledShift';
import { AuthService } from '../login/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {

    private apiUrl = 'https://analogio.dk/shiftplanning/api';  // URL to web API

    constructor(private http: HttpClient, private authService: AuthService) { }

    public getSchedule(id: number): Observable<Schedule> {
        const url = `${this.apiUrl}/schedules/${id}`;
        return this.http.get<Schedule>(url, { headers: this.authService.createAuthorizationHeader() }).pipe(
            tap(data => console.log('getSchedule: ', data)),
            catchError(this.handleError)
        );
    }

    public getSchedules(): Observable<Schedule[]> {
        const url = `${this.apiUrl}/schedules`;
        return this.http.get<Schedule[]>(url, { headers: this.authService.createAuthorizationHeader() }).pipe(
            tap(data => console.log('getSchedules: ', data)),
            catchError(this.handleError)
        );
    }

    public createSchedule(name: string, numberOfWeeks: number): Observable<Schedule> {
        const url = `${this.apiUrl}/schedules`;
        return this.http.post<Schedule>(url, { name: name, numberOfWeeks: numberOfWeeks }, { headers: this.authService.createAuthorizationHeader() }).pipe(
            tap(data => console.log('createSchedule: ', data)),
            catchError(this.handleError)
        );
    }

    public createScheduledShift(scheduleId: number, scheduledShift: ScheduledShift): Observable<ScheduledShift> {
        const url = `${this.apiUrl}/schedules/${scheduleId}`;
        return this.http.post<ScheduledShift>(url, scheduledShift, { headers: this.authService.createAuthorizationHeader() }).pipe(
            tap(data => console.log('createScheduledShift: ', data)),
            catchError(this.handleError)
        );
    }

    public updateScheduledShift(scheduleId: number, scheduledShift: ScheduledShift): Observable<any> {
        const url = `${this.apiUrl}/schedules/${scheduleId}/${scheduledShift.id}`;
        return this.http.put(url, scheduledShift, { headers: this.authService.createAuthorizationHeader() }).pipe(
            tap(_ => console.log(`updated scheduledshift id=${scheduledShift.id}`)),
            catchError(this.handleError)
        );
    }

    public deleteScheduledShift(scheduleId: number, scheduledShiftId: number): Observable<any> {
        const url = `${this.apiUrl}/schedules/${scheduleId}/${scheduledShiftId}`;
        return this.http.delete(url, { headers: this.authService.createAuthorizationHeader() }).pipe(
            tap(_ => console.log(`deleted scheduledshift id=${scheduledShiftId}`)),
            catchError(this.handleError)
        );
    }

    public rollOut(scheduleId: number, from: string, to: string, startFromScheduledWeek: number): Observable<ScheduledShift[]> {
        const url = `${this.apiUrl}/schedules/${scheduleId}/rollout`;

        var dto = {
            from: from,
            to: to,
            startFromScheduledWeek: startFromScheduledWeek
        };

        return this.http.post<ScheduledShift[]>(url, dto, { headers: this.authService.createAuthorizationHeader() }).pipe(
            tap(_ => console.log(`rolled out schedule id=${scheduleId} from=${from} to=${to} startFromScheduledWeek=${startFromScheduledWeek}`)),
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
