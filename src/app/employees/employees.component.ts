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
    orderCheckinsDesc = false;
    orderFirstNameDesc = false;
    orderLastNameDesc = false;
    orderIdDesc = false;
    orderEmailDesc = false;
    orderActiveDesc = false;
    orderEmployeeTitleDesc = false;

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

    orderByCheckIns(): void {
        this.orderCheckinsDesc = !this.orderCheckinsDesc;
        if (this.orderCheckinsDesc) {
            this.employees.sort(function (a, b) { return (a.checkInCount > b.checkInCount) ? 1 : ((b.checkInCount > a.checkInCount) ? -1 : 0); });
        } else {
            this.employees.sort(function (a, b) { return (a.checkInCount < b.checkInCount) ? 1 : ((b.checkInCount < a.checkInCount) ? -1 : 0); });
        }
    }

    orderByFirstName(): void {
        this.orderFirstNameDesc = !this.orderFirstNameDesc;
        if (this.orderFirstNameDesc) {
            this.employees.sort(function (a, b) { return (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0); });
        } else {
            this.employees.sort(function (a, b) { return (a.firstName < b.firstName) ? 1 : ((b.firstName < a.firstName) ? -1 : 0); });
        }
    }

    orderByLastName(): void {
        this.orderLastNameDesc = !this.orderLastNameDesc;
        if (this.orderLastNameDesc) {
            this.employees.sort(function (a, b) { return (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0); });
        } else {
            this.employees.sort(function (a, b) { return (a.lastName < b.lastName) ? 1 : ((b.lastName < a.lastName) ? -1 : 0); });
        }
    }

    orderById(): void {
        this.orderIdDesc = !this.orderIdDesc;
        if (this.orderIdDesc) {
            this.employees.sort(function (a, b) { return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0); });
        } else {
            this.employees.sort(function (a, b) { return (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0); });
        }
    }

    orderByEmail(): void {
        this.orderEmailDesc = !this.orderEmailDesc;
        if (this.orderEmailDesc) {
            this.employees.sort(function (a, b) { return (a.email > b.email) ? 1 : ((b.email > a.email) ? -1 : 0); });
        } else {
            this.employees.sort(function (a, b) { return (a.email < b.email) ? 1 : ((b.email < a.email) ? -1 : 0); });
        }
    }

    orderByActive(): void {
        this.orderActiveDesc = !this.orderActiveDesc;
        if (this.orderActiveDesc) {
            this.employees.sort(function (a, b) { return (a.active > b.active) ? 1 : ((b.active > a.active) ? -1 : 0); });
        } else {
            this.employees.sort(function (a, b) { return (a.active < b.active) ? 1 : ((b.active < a.active) ? -1 : 0); });
        }
    }

    orderByEmployeeTitle(): void {
        this.orderEmployeeTitleDesc = !this.orderEmployeeTitleDesc;
        if (this.orderEmployeeTitleDesc) {
            this.employees.sort(function (a, b) { return (a.employeeTitle > b.employeeTitle) ? 1 : ((b.employeeTitle > a.employeeTitle) ? -1 : 0); });
        } else {
            this.employees.sort(function (a, b) { return (a.employeeTitle < b.employeeTitle) ? 1 : ((b.employeeTitle < a.employeeTitle) ? -1 : 0); });
        }
    }

}
