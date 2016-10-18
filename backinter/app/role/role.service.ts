import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { IRole } from './IRole';

@Injectable()
export class RoleService {
    constructor(private http: Http) { }
    getrole() {
        return this.http.get("role/role.json")
            .map((response: Response) => <Array<IRole>>response.json());

    }
}