import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { Schedule } from './schedule';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  constructor(private scheduleService: ScheduleService, private modalService: NgbModal) { }

  schedules: Schedule[];

  selectedSchedule: Schedule;

  ngOnInit() {
    this.getSchedules();
  }

  openModal(content): void {
    this.modalService.open(content);
  }

  getSchedules(): void {
    this.scheduleService.getSchedules()
    .subscribe(schedules => this.schedules = schedules);
  }

  onSelect(schedule: Schedule): void {
    this.selectedSchedule = schedule;
  }

  createSchedule(name: string, numberOfWeeks: number) {
    this.modalService.dismissAll();
    this.scheduleService.createSchedule(name, numberOfWeeks)
    .subscribe(dto => {
      if(dto != null) {
        this.schedules.push(dto);
      }
    });
  }

}
