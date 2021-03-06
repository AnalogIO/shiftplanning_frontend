import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Schedule } from '../schedules/schedule';
import { ScheduleService } from '../schedules/schedule.service';
import { ScheduledShift } from '../schedules/scheduledShift';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbService } from '../breadcrumb/breadcrumb.service';

@Component({
    selector: 'app-schedule-detail',
    templateUrl: './schedule-detail.component.html',
    styleUrls: ['./schedule-detail.component.css']
})
export class ScheduleDetailComponent implements OnInit {
    schedule: Schedule;
    selectedScheduledShift: ScheduledShift;
    newScheduledShift: boolean;

    @Input()
    set _schedule(_schedule: Schedule) {
        if (_schedule != null) {
            this.schedule = _schedule;
            this.schedule.scheduledShifts = this.orderScheduledShifts(this.schedule.scheduledShifts);
        }
    }

    constructor(private route: ActivatedRoute, private scheduleService: ScheduleService, private modalService: NgbModal) { }

    ngOnInit() {
        if (this.schedule == null) {
            this.getSchedule();
        }
    }

    openModal(content): void {
        this.modalService.open(content, { size: 'lg' });
    }

    getSchedule(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.scheduleService.getSchedule(id).subscribe(
            schedule => this.schedule = schedule,
            error => alert(<any>error)
        );
    }

    orderScheduledShifts(scheduledShifts: ScheduledShift[]): ScheduledShift[] {
        return scheduledShifts.sort((obj1: ScheduledShift, obj2: ScheduledShift) => {
            if (obj1.day < obj2.day) { return -1; }
            if (obj1.day > obj2.day) { return 1; }
            return obj1.start.localeCompare(obj2.start);
        });
    }

    updateScheduledShift(scheduledShift: ScheduledShift): void {
        if (scheduledShift == null) {
            this.getSchedule();
            this.selectedScheduledShift = null;
            return;
        }

        let updateItem = this.schedule.scheduledShifts.find(x => x.id == scheduledShift.id);
        let index = this.schedule.scheduledShifts.indexOf(updateItem);
        this.schedule.scheduledShifts[index] = scheduledShift;
        this.schedule = JSON.parse(JSON.stringify(this.schedule)); // hack the binding :-/
        this.selectedScheduledShift = this.schedule.scheduledShifts[index];
    }

    createdScheduledShiftEvent(scheduledShift: ScheduledShift): void {
        if (scheduledShift == null) {
            this.selectedScheduledShift = null;
            return;
        }

        this.schedule.scheduledShifts.push(scheduledShift);
        this.schedule = JSON.parse(JSON.stringify(this.schedule)); // hack the binding :-/
        let createdItem = this.schedule.scheduledShifts.find(x => x.id == scheduledShift.id);
        let index = this.schedule.scheduledShifts.indexOf(createdItem);
        this.onSelect(this.schedule.scheduledShifts[index]);
        this.newScheduledShift = false;
    }

    rollout(from: NgbDateStruct, to: NgbDateStruct, startFrom: number): void {
        var fromStr = `${from.day}-${from.month}-${from.year.toString().slice(-2)}`;
        var toStr = `${to.day}-${to.month}-${to.year.toString().slice(-2)}`;
        this.scheduleService.rollOut(this.schedule.id, fromStr, toStr, startFrom).subscribe(
            shifts => {
                this.modalService.dismissAll();
                alert(`Rolled out ${shifts.length} shifts with success!`);
            },
            error => alert(<any>error)
        );
    }

    onSelect(scheduledShift: ScheduledShift): void {
        this.newScheduledShift = false;
        this.selectedScheduledShift = scheduledShift;
        this.selectedScheduledShift.employees = scheduledShift.employees.map((i) => { i.fullName = i.firstName + ' ' + i.lastName; return i; });
    }

    selectNewScheduledShift(day: number): void {
        this.selectedScheduledShift = new ScheduledShift();
        this.selectedScheduledShift.day = day;
        this.newScheduledShift = true;
    }

    dayOfWeekAsString(dayIndex): string {
        dayIndex = dayIndex % 7;
        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex];
    }

    weekOfDay(dayIndex): number {
        return Math.floor(dayIndex / 7) + 1;
    }

    counter(i: number) {
        return new Array(i);
    }

}
