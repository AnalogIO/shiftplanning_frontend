import { Employee } from "../employees/employee";
import { ScheduledShift } from "./scheduledShift";

export class Schedule {
    id: number;
    name: string;
    numberOfWeeks: number;
    scheduledShifts: ScheduledShift[];
}