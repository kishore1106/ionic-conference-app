import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { IUser } from './IUser';

@Injectable()
export class GenericFilterService {
    constructor(private http:Http) { }
	getDetails(){
	    return this.http.get("http://localhost:8001/user/57e0d98fba7b3f1828080db9")
	        .map((res: Response) => <Array<IUser>>res.json());
	}
    getDivisions(departmentId){
          return this.http.get("http://localhost:8001/department/"+departmentId+"/divisions")
	        .map((res: Response) => <Array<IUser>>res.json());
    }
      
    getSections(divisionId:string){
	    return this.http.get("http://localhost:8001/divisions/"+divisionId+"/sections")
	        .map((res: Response) => <Array<IUser>>res.json());
	}
    
    getTeams(sectionId:string){
	    return this.http.get("http://localhost:8001/sections/"+ sectionId +"/teams")
	        .map((res: Response) => <Array<IUser>>res.json());
	}
    
 }
