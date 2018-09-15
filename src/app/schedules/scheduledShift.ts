import { Employee } from "../employees/employee";

export class ScheduledShift {
    id: number;
    day: number;
    start: string;
    end: string;
    maxOnShift: number;
    minOnShift: number;
    employees: Employee[];
    employeeIds: number[];
    lockedEmployeeIds: number[];
}