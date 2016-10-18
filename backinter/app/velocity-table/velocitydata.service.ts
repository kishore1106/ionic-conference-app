import { Injectable } from '@angular/core';
import { Http, Response,Headers,RequestOptions } from '@angular/http';
import { IVelocity } from './IVelocity';


@Injectable()
export class VelocityDataService {
    constructor(private http: Http) {}
    getVelocityDetails(teamId,year) {
        return this.http.get("http://localhost:8001/teams/"+teamId+"/velocity?year="+year)
            .map((res: Response) => <Array<IVelocity>>res.json());
    }
    updateVelocityDetails(velocityDetails){
        let body = JSON.stringify(velocityDetails.velocityData);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
          return this.http.post("http://localhost:8001/teams/"+velocityDetails._id+"/velocity", body, options)
                    .map((res: Response) => <Array<any>>res.json());        
    }
}
