import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shift } from '../shifts/shift';
import { ShiftService } from '../shift.service';

@Component({
  selector: 'app-shift-detail',
  templateUrl: './shift-detail.component.html',
  styleUrls: ['./shift-detail.component.css']
})
export class ShiftDetailComponent implements OnInit {

  @Input() shift: Shift;

  constructor(private route: ActivatedRoute, private shiftService: ShiftService) { }

  ngOnInit() {
  }

  getShift(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.shiftService.getShift(id)
      .subscribe(shift => this.shift = shift);
  }

}
