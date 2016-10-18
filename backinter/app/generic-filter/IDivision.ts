import { ISection } from './ISection';

export interface IDivision {
    id: string;
    name: string;
    parentId: string;
    source: string;
    sections: Array<ISection>;
}