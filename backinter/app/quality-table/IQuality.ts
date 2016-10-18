import { IQualityData } from './IQualityData';
export interface IQuality{
    divisionId: string;
    divisionName: string;
    sectionId: string;
    sectionName: string;
    teamId: string;
    teamName: string;
    qualityData: Array<IQualityData>;
}