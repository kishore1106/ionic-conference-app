import { Injectable } from '@angular/core';
import { Http, Response,Headers,RequestOptions } from '@angular/http';

import { IQuality } from './IQuality';

@Injectable()
export class QualityDataService {

    constructor(private http: Http) { }

    getQualityDetails(teamId,year) {
        return this.http.get("http://localhost:8001/teams/"+teamId+"/quality?year="+year)
            .map((res: Response) => <Array<any>>res.json());
    }
    updateQualityDetails(qualityDetails){
        let body = JSON.stringify(qualityDetails.qualityData);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
          return this.http.post("http://localhost:8001/teams/"+qualityDetails.teamId+"/quality", body, options)
                    .map((res: Response) => <Array<any>>res.json());
    }
    
    getQualityDetailsfromdb(teamID:string) {
        return this.http.get("http://localhost:8001/teams/" +teamID+"/quality")
            .map((res: Response) => <Array<any>>res.json());
    }
        getQualityDetailsWithoutYear(teamId) {
        return this.http.get("http://localhost:8001/teams/"+teamId+"/quality")
            .map((res: Response) => <Array<any>>res.json());
    }
    getSectionNameBySectionId(sectionID:string){
         return this.http.get("http://localhost:8001/sections/" + sectionID)
            .map((res: Response) => <Array<any>>res.json());
    }
}

// above is the testuserquality.json reponse json for corresponding team id 
// GET api/v1/teams/teamid/quality