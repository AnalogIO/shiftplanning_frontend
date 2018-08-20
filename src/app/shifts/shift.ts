import { Employee } from "../employees/employee";
import { Checkin } from "./checkin";

export class Shift {
    id: number;
    start: Date;
    end: Date;
    scheduleId: number;
    employees: Employee[];
    checkIns: Checkin[];
}