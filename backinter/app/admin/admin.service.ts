import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions,Headers } from '@angular/http';

@Injectable()
export class AdminService {


    constructor(private http:Http) { }
	getAllRoles(){
		var headers = new Headers();
	var accesstoken = localStorage.getItem('accessToken');
	headers.append( 'Content-Type', 'application/X-www-form-urlencoded' );
	headers.append("Authorization","Basic" + accesstoken);
	    return this.http.get("http://localhost:8001/access")
	        .map((res: Response) => <Array<any>>res.json());
	}
	getAllTeams(){
	    return this.http.get("http://localhost:8001/teams")
	        .map((res: Response) => <Array<any>>res.json());
	}
    getAllSections(){
	    return this.http.get("http://localhost:8001/sections")
	        .map((res: Response) => <Array<any>>res.json());
	}
    getAllDivisions(){
	    return this.http.get("http://localhost:8001/divisions")
	        .map((res: Response) => <Array<any>>res.json());
	}
    getAllDepartment(){
	    return this.http.get("http://localhost:8001/department")
	        .map((res: Response) => <Array<any>>res.json());
	}
    getAllDivisionsByDepartmentID(departmentID:string){
	    return this.http.get("http://localhost:8001/department/"+departmentID+"/divisions")
	        .map((res: Response) => <Array<any>>res.json());
	}
	getAllSectionsByDivisionID(divisionID:string){
	    return this.http.get("http://localhost:8001/divisions/"+divisionID+"/sections")
	        .map((res: Response) => <Array<any>>res.json());
	}
	getAllTeamsBySectionID(sectionID:string){
	    return this.http.get("http://localhost:8001/sections/"+sectionID+"/teams")
	        .map((res: Response) => <Array<any>>res.json());
	}
	getWeigtagesByID(ID:string){
		return this.http.get("http://localhost:8001/myweightage/" + ID)
	        .map((res: Response) => <Array<any>>res.json());
	}
postNewDivisionWeightagedetils(divisionID:string,divisionWeightage:any){
	let body = JSON.stringify(divisionWeightage);
	let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
		 return this.http.post("http://localhost:8001/myweightage/" + divisionID,body,options)
	        .map((res: Response) => <Array<any>>res.json());
	}



	postNewUserdetils(userdetail:any){
		 return this.http.post("http://localhost:8001/users/",userdetail)
	        .map((res: Response) => <Array<any>>res.json());
	}

addNewUser (userdetail: any){
    //let body = JSON.stringify({ userdetail });
	let body = JSON.stringify(userdetail);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://localhost:8001/users", body, options)
                    .map((res: Response) => <Array<any>>res.json());
                    
  }
  deleteUser(cwsID:string){
	  return this.http.delete("http://localhost:8001/users/"+cwsID)
	        .map((res: Response) => <Array<any>>res.json());
  }
  addWeightage(qualityDetails:any){
	let body = JSON.stringify(qualityDetails);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://localhost:8001/teams/"+qualityDetails.teamId+"/quality", body, options)
                    .map((res: Response) => <Array<any>>res.json());
                    
  }
userid;
isAuthenticated
requestwithaccesstoken(){
	var headers = new Headers();
	var accesstoken = localStorage.getItem('accessToken');
	headers.append( 'Content-Type', 'application/X-www-form-urlencoded' );
	headers.append("Authorization","Bearer" + accesstoken);
	return new Promise((resolve)=>{
		this.http.post("http://localhost:8001/authenticte",accesstoken,{headers:headers}).map((data)=>{
			if(data.json().success){
				// this.userid=data.json().userid;
				// this.isAuthenticated=true;
				console.log("success");
				

			}
			resolve(this.isAuthenticated)
	})
})
}
}
