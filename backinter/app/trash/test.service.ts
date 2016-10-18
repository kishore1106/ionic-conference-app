import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Test } from './test';


@Injectable()
export class TestService {
    // Test:Observable<Test[]>;
    constructor(private http:Http) { }
    // private dataurl = '/trash/testlist';

// gettest()
// {
//    return this.http.get(this.dataurl)
//                                     .map(this.extractdata)
//                                     .catch(this.handleerror);
// }
// private extractdata(res: Response) {
//     let body = res.json();
//     return body.data ||{};
// }
// private handleerror(error:any) {
//     let errMsg = (error.message) ? error.message :
//       error.status ? `${error.status} - ${error.statusText}` : 'Server error';
//     console.error(errMsg); // log to console instead
//     return Observable.throw(errMsg);
// }

gettest(){
    return this.http.get(".././MockData/teams.quality.json")
        .map((res: Response) =><Test[]>res.json());
}
 }
