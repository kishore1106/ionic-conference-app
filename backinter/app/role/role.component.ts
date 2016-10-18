import {Component, OnInit,Output,EventEmitter} from '@angular/core';
import { Observable } from 'rxjs/Rx';

import{GenericFilterComponent}from'../generic-filter/generic.filter.component';
import {RoleService} from './role.service';
import {IRole} from './IRole';

@Component({
    selector: 'my-role',
    templateUrl: 'role/role.component.html',
    providers: [RoleService],
})
export class RoleComponent implements OnInit{

    roles: Observable<Array<IRole>>;
    selectedRole: string='Supervisor';
    @Output()selectedRoleIdEvent: EventEmitter<string> =new EventEmitter<string>();

    constructor(private roleservice: RoleService) { }

    getrole() {
        this.roles= this.roleservice.getrole();
    }

    ngOnInit() {
        this.selectedRoleIdEvent.emit(this.selectedRole);
        this.getrole();
    }

    onSelect() {
        //console.log('onSelect triggered ', this.selectedRole);
        this.selectedRoleIdEvent.emit(this.selectedRole);
    }

}