import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class GraphDataService {

    constructor(private http: Http) { }

    getQualityDetails() {
        return this.http.get("report/testdata.json")
            .map((res: Response) => <Array<any>>res.json());
    }
}