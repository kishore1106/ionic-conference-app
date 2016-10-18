import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class ReportDataService {
// filename:string="tes.division";
   constructor(private http:Http) { }
    getQualityDetailsBySectionId(sectionId) {
        return this.http.get("http://localhost:8001/sections/"+sectionId+"/quality")
            .map((res: Response) => <Array<any>>res.json());
    }
    getVelocityDetailsBySectionId(sectionId){
        return this.http.get("http://localhost:8001/sections/"+sectionId+"/velocity")
            .map((res: Response) => <Array<any>>res.json());        
        }

}