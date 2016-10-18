import { IDivision } from './IDivision';

export interface IDepartment {
    id: string;
    name: string;
    parentId: string;
    source: string;
    divisions: Array<IDivision>;
}