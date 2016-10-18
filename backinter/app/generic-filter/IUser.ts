import { IDepartment } from './IDepartment';

export interface IUser {
    userId: string;
    firstName: string;
    lasteName: string;
    roleId: string;
    department: IDepartment;
}