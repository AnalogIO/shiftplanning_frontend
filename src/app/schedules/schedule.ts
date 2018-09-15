import { Employee } from "../employees/employee";
import { ScheduledShift } from "./scheduledShift";

export class Schedule {
    id: number;
    name: String;
    numberOfWeeks: number;
    scheduledShifts: ScheduledShift[];
}