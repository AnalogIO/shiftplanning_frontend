import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScheduledShift } from '../schedules/scheduledShift';
import { ScheduleService } from '../schedule.service';
import { Employee } from '../employees/employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-scheduledshift-detail',
  templateUrl: './scheduledshift-detail.component.html',
  styleUrls: ['./scheduledshift-detail.component.css']
})
export class ScheduledshiftDetailComponent implements OnInit {

  private scheduledShift: ScheduledShift;

  @Output() valueChange = new EventEmitter();

  @Input() scheduleId: number;

  @Input()
  set data(scheduledshift: ScheduledShift) {
    if(scheduledshift == null) return;
    this.scheduledShift = JSON.parse(JSON.stringify(scheduledshift));
  }

  employees: Employee[] = [];

  constructor(private scheduleService: ScheduleService, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees.map((i) => { i.fullName = i.firstName + ' ' + i.lastName; return i; });
    });
  }
  
  update(): void {
    // call scheduleservice to update
    this.scheduledShift.employeeIds = this.scheduledShift.employees.map(e => e.id);
    this.scheduleService.updateScheduledShift(this.scheduleId, this.scheduledShift)
      .subscribe(() => {
        this.valueChange.emit(this.scheduledShift);
      });
  }
}