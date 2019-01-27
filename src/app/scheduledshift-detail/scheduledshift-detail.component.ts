import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScheduledShift } from '../schedules/scheduledShift';
import { ScheduleService } from '../schedules/schedule.service';
import { Employee } from '../employees/employee';
import { EmployeeService } from '../employees/employee.service';

@Component({
    selector: 'app-scheduledshift-detail',
    templateUrl: './scheduledshift-detail.component.html',
    styleUrls: ['./scheduledshift-detail.component.css']
})
export class ScheduledshiftDetailComponent implements OnInit {

    scheduledShift: ScheduledShift;

    @Output() valueChange = new EventEmitter();

    @Input() scheduleId: number;

    @Input() isNewScheduledShift: boolean;

    @Input()
    set data(scheduledshift: ScheduledShift) {
        if (scheduledshift == null) return;
        this.scheduledShift = JSON.parse(JSON.stringify(scheduledshift));
    }

    employees: Employee[] = [];

    constructor(private scheduleService: ScheduleService, private employeeService: EmployeeService) { }

    ngOnInit() {
        this.getEmployees();
    }

    getEmployees(): void {
        this.employeeService.getEmployees().subscribe(employees => {
            this.employees = employees.filter(x => x.active).map((i) => { i.fullName = i.firstName + ' ' + i.lastName; return i; });
        });
    }

    update(): void {
        // call scheduleservice to update
        this.scheduledShift.employeeIds = this.scheduledShift.employees.map(e => e.id);
        this.scheduleService.updateScheduledShift(this.scheduleId, this.scheduledShift).subscribe(
            _ => this.valueChange.emit(this.scheduledShift),
            error => alert(<any>error)
        );
    }

    create(): void {
        // call scheduleservice to create
        this.scheduledShift.employeeIds = this.scheduledShift.employees.map(e => e.id);
        this.scheduleService.createScheduledShift(this.scheduleId, this.scheduledShift).subscribe(
            scheduledShift => {
                this.scheduledShift = scheduledShift;
                this.valueChange.emit(this.scheduledShift);
            },
            error => alert(<any>error)
        );
    }

    delete(): void {
        this.scheduleService.deleteScheduledShift(this.scheduleId, this.scheduledShift.id).subscribe(
            _ => {
                this.scheduledShift = null;
                this.valueChange.emit(null);
            },
            error => alert(<any>error)
        );
    }
}
