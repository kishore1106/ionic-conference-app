import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { GenericSelectorComponent } from './generic-selector/generic.selector.component';
import { GenericFilterService } from './generic.filter.service';
import { RoleComponent }from'.././role/role.component';
import { IList } from './generic-selector/IList';
import { IDepartment } from './IDepartment';
import { IDivision } from './IDivision';
import { ISection } from './ISection';
import { ITeam } from './ITeam';
import { IUser } from './IUser';

@Component({
    selector: 'my-generic-filter',
    templateUrl: 'generic-filter/generic.filter.component.html',
    //directives: [RoleComponent, GenericSelectorComponent],
    providers: [GenericFilterService]
})
export class GenericFilterComponent implements OnInit {
    department: any;
    divisions: Array<IDivision>;
    sections: Array<ISection>;
    teams: Array<ITeam>;
    disableSection: boolean;
    disableTeam: boolean;
    disableDivision: boolean;
    disableDepartment: boolean
    @Output() selectedListOutput: EventEmitter<IList> = new EventEmitter<IList>();
    @Input() report: boolean = false;
    constructor(private _genericfilterservice: GenericFilterService) { }

    ngOnInit() {
//this.selectedRoleId("1"); //Hard coded roleId for initialization
    }

    selectedRoleId(roleId: string): void {

        if (roleId === "1") {
            this.disableDivision = true;
            this.disableSection = true;
            this.disableTeam = false;
            this.disableDepartment = true;
        }
        else if (roleId === "2") {
            this.disableDivision = true;
            this.disableSection = true;
            this.disableTeam = false;
            this.disableDepartment = true;
        }
        else if (roleId === "3") {
            this.disableDivision = false;
            this.disableSection = false;
            this.disableTeam = false;
            this.disableDepartment = true;
        }
        else if (roleId === "4") {
            this.disableDivision = false;
            this.disableSection = false;
            this.disableTeam = false;
            this.disableDepartment = false;
        }
        this._genericfilterservice.getDetails().subscribe((_users: Array<IUser>) => {
            let user: IUser = _users.find((user: IUser) => user.roleId === roleId);
            // console.log('User  ', user);
            if (user) {
                this.department = user.department.name;
                // console.log("department",this.department)
                this.divisions = user.department.divisions;
                // console.log('Before Divisions ', this.divisions);
                // console.log('After Divisions ', this.divisions);
                this.sections = this.divisions[0].sections;
                // this.teams = this.sections[0].teams;
                console.log("final value div,sec,team", this.divisions, this.sections, this.teams);
                             

            }
        });
    }

    onSelect(list: IList): void {
        if (list.source === 'division') {
            let division: IDivision = this.divisions.find((division: IDivision) => division.id === list.id);
            if (division) {
                this.sections = division.sections;
                // console.log("Sections",this.sections);
            }
        }
        if (list.source === 'section') {
            // let section: ISection = this.sections.find((section: ISection) => section.id === list.id);
            // if (section) {
                // this.teams = section.teams;
            // }
        }
        this.selectedListOutput.emit(list);
    }

   }