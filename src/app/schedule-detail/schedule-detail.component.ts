import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Schedule } from '../schedules/schedule';
import { ScheduleService } from '../schedule.service';
import { ScheduledShift } from '../schedules/scheduledShift';
import { markParentViewsForCheck, checkAndUpdateBinding } from '@angular/core/src/view/util';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.css']
})
export class ScheduleDetailComponent implements OnInit {
  private schedule: Schedule;
  private selectedScheduledShift: ScheduledShift;
  @Input()
  set _schedule(_schedule: Schedule) {
    if(_schedule != null) {
      this.schedule = _schedule;
      this.schedule.scheduledShifts = this.orderScheduledShifts(this.schedule.scheduledShifts);
    }
  }

  constructor(private route: ActivatedRoute, private scheduleService: ScheduleService) { }

  ngOnInit() {
    if(this.schedule == null) {
      this.getSchedule();
    }
  }

  getSchedule(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.scheduleService.getSchedule(id)
      .subscribe(schedule => this.schedule = schedule);
  }

  orderScheduledShifts(scheduledShifts: ScheduledShift[]): ScheduledShift[] {
    return scheduledShifts.sort((obj1: ScheduledShift, obj2: ScheduledShift) => {
      if (obj1.day < obj2.day) { return -1;}
      if (obj1.day > obj2.day) { return 1;}
      return obj1.start.localeCompare(obj2.start);
    });
  }

  updateScheduledShift(scheduledShift: ScheduledShift): void {
    if(scheduledShift == null) return;
    let updateItem = this.schedule.scheduledShifts.find(x => x.id == scheduledShift.id);
    let index = this.schedule.scheduledShifts.indexOf(updateItem);
    this.schedule.scheduledShifts[index] = scheduledShift;
    this.schedule = JSON.parse(JSON.stringify(this.schedule)); // hack the binding :-/
    this.selectedScheduledShift = this.schedule.scheduledShifts[index];
  }
  
  onSelect(scheduledShift: ScheduledShift): void {
    this.selectedScheduledShift = scheduledShift;
    this.selectedScheduledShift.employees = scheduledShift.employees.map((i) => { i.fullName = i.firstName + ' ' + i.lastName; return i; });
  }

  dayOfWeekAsString(dayIndex): string {
    dayIndex = dayIndex % 7;
    return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex];
  }

  weekOfDay(dayIndex): number {
    return Math.floor(dayIndex/7) + 1;
  }

  counter(i: number) {
    return new Array(i);
  }

}