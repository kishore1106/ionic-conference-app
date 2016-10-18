import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IUser}from './IUser';


@Injectable()
export class UserDataService {

    constructor(private http: Http) { }


    getUserDetails() {
        return this.http.get("http://localhost:8001/user/57e0d963ba7b3f1828080db7")
            .map((res: Response) => <Array<any>>res.json());
    }
}