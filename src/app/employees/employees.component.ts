import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from './employee';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

    employees: Employee[];

    constructor(private employeeService: EmployeeService) { }

    ngOnInit() {
        this.getEmployees();
    }

    getEmployees(): void {
        this.employeeService.getEmployees().subscribe(dto => {
            if (dto != null) this.employees = dto;
        });
    }

    syncPodio(): void {
        this.employeeService.syncPodioEmployees().subscribe(dto => {
            if (dto != null) {
                alert(`Synced ${dto.syncCount} employees with success!`);
                this.getEmployees();
            }
        });
    }

}
