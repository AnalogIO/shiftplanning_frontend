import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../shift.service';
import { Shift } from './shift';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.css']
})
export class ShiftsComponent implements OnInit {

  constructor(private shiftService: ShiftService) { }

  shifts: Shift[];
  selectedShift: Shift;

  ngOnInit() {
    this.getShifts();
  }

  getShifts(): void {
    this.shiftService.getShifts()
    .subscribe(shifts => this.shifts = shifts);
  }

  onSelect(shift: Shift): void {
    this.selectedShift = shift;
  }

}
