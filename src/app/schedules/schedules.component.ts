import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { Schedule } from './schedule';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  constructor(private scheduleService: ScheduleService) { }

  schedules: Schedule[];

  selectedSchedule: Schedule;

  ngOnInit() {
    this.getSchedules();
  }

  getSchedules(): void {
    this.scheduleService.getSchedules()
    .subscribe(schedules => this.schedules = schedules);
  }

  onSelect(schedule: Schedule): void {
    this.selectedSchedule = schedule;
  }

}
