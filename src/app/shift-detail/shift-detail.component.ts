import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Shift } from '../shifts/shift';
import { ShiftService } from '../shifts/shift.service';

@Component({
    selector: 'app-shift-detail',
    templateUrl: './shift-detail.component.html',
    styleUrls: ['./shift-detail.component.css']
})
export class ShiftDetailComponent implements OnInit {

    @Input() shift: Shift;

    @Output() valueChange = new EventEmitter();

    constructor(private route: ActivatedRoute, private shiftService: ShiftService, private router: Router) { }

    ngOnInit() {
    }

    getShift(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.shiftService.getShift(id).subscribe(
            shift => this.shift = shift,
            error => alert(<any>error)
        );
    }

    delete(shift: Shift): void {
        this.shiftService.deleteShift(shift.id).subscribe(
            _ => {
                this.shift = null;
                this.valueChange.emit(null);
            },
            error => alert(<any>error)
        );
    }

}
