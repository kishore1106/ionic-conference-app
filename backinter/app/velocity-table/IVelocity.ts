import {IVelocityData}from'./IVelocityData';
export interface IVelocity{
    divisionId:string;

    sectionId:string;
    
    teamId:string;

    velocityData:Array<IVelocityData>;
}