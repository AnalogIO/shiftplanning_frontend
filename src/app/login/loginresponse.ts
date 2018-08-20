import {Employee} from '../employees/employee';

export class LoginResponse {
    token: string;
    organizationId: string;
    organizationName: string;
    expires: number;
    employee: Employee
}