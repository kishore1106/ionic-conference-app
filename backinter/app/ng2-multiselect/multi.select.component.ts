import { Component, OnInit, Input, SimpleChange, EventEmitter, Output} from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { MultiselectDropdown, IMultiSelectOption, IMultiSelectSettings } from './multiselect-dropdown';
import { GenericFilterService } from '.././generic-filter/generic.filter.service';
import { RoleComponent }from'.././role/role.component';
import { IList } from '.././generic-filter/./generic-selector/IList';
import { IDepartment } from '.././generic-filter/IDepartment';
import { IDivision } from '.././generic-filter/IDivision';
import { ISection } from '.././generic-filter/ISection';
import { ITeam } from '.././generic-filter/ITeam';
import { IUser } from '.././generic-filter/IUser';


@Component({
    // moduleId: module.id,
    selector: 'my-multi-selector',
    templateUrl: 'ng2-multiselect/multi.select.component.html',


})
export class MultiSelectComponent implements OnInit {
    constructor(private _genericfilterservice: GenericFilterService) { }
    tempTeams: any = [];
    tempSections: any = [];
    @Input() tempdivisions: any = [];
    checkAll: boolean;
    department: any = [];
    divisions: Array<any> = [];
    sections: Array<any> = [];
    teams: Array<any> = [];
    role: string;
    disableSection: boolean;
    disableDivision: boolean;
    disableDepartment: boolean
    division: any = [];
    section: any = [];
    temptem: any = [];


    @Input() disableTeam: boolean;
    @Output() selectedListOutput: EventEmitter<Array<IList>> = new EventEmitter<Array<IList>>();
    @Output() disableEdit = new EventEmitter();
    @Output() loggedInUserRole: EventEmitter<any> = new EventEmitter<any>();
    @Input() report: boolean = false;
    @Output() selectedlistofsections: EventEmitter<Array<IList>> = new EventEmitter<Array<IList>>();
    @Output() selectedlistofdivisions: EventEmitter<Array<IList>> = new EventEmitter<Array<IList>>();


    showAgrregation: any = {
        showDepartmentAggregation: false,
        showDivisionAgrregation: false,
        showSectionAgrregation: false
    };


    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if ((this.tempdivisions.length) > 0) {
            console.log("this.tempdivisions", this.tempdivisions);
        }
        else {
            console.log('this.temp==');
        }
    }
    ngOnInit() {
        //this.selectedRoleId("1"); //Hard coded roleId for initialization
        this.selectedRoleId();

    }
    selectedRoleId(): void {
        this._genericfilterservice.getDetails().subscribe((_users: Array<IUser>) => {
            let user: any = _users;
            console.log("user", user);
            if (user) {
                //check the role for dropdown
                if (user.role === "Team Member" || user.role === "Team Lead") {
                    this.role = 'Team Member';
                    this.teams = user.teams;
                    this.disableDivision = true;
                    this.disableSection = true;
                    this.disableTeam = true;
                    this.disableDepartment = true;
                    this.disableEdit.emit(false);
                    console.log("role at if", user.role);
                    this.showAgrregation.showDepartmentAggregation = false;
                    this.showAgrregation.showDivisionAgrregation = false;
                    this.showAgrregation.showSectionAgrregation = false;
                    this.loggedInUserRole.emit(this.showAgrregation);



                }
                else if (user.role === "Supervisor") {
                    this.role = 'Supervisor';
                    this.divisions = [];
                    this.sections = [];
                    this.teams = [];
                    this.sections = user.sections.map((section) => section);
                    console.log("this.sections[0]._id", this.sections[0]._id);
                    this._genericfilterservice.getTeams(this.sections[0]._id).subscribe((_teams: Array<any>) => {
                        let team = _teams;
                        this.teams = team.map((team) => team);
                        this.disableDivision = true;
                        this.disableSection = true;
                        this.disableTeam = false;
                        this.disableDepartment = true;
                        console.log("sup data", this.sections, this.teams);

                    });
                    this.showAgrregation.showDepartmentAggregation = false;
                    this.showAgrregation.showDivisionAgrregation = false;
                    this.showAgrregation.showSectionAgrregation = true;
                    this.loggedInUserRole.emit(this.showAgrregation);
                }
                else if (user.role === "Division Manager") {
                    this.role = 'Division Manager';
                    console.log("reachedD");
                    this.divisions = user.divisions;
                    //console.log("this.division",this.divisions);
                    //this.tempdivisions.push( Object.assign({},this.divisions));//use map funtion here instead of object.assign

                    this.tempdivisions = this.divisions.map((division) => division);
                    // console.log("tempdivisions",this.tempdivisions);

                    this._genericfilterservice.getSections(this.divisions[0]._id).subscribe((_sections: Array<any>) => {
                        let section = _sections;
                        this.sections = section;
                        // console.log("sections",this.sections);
                        this.tempSections = this.sections.map((section) => section);
                        // console.log("sections",this.tempSections);
                        //this.tempSections.push(Object.assign({},this.sections));//use map funtion here instead of object.assign
                        this.teams = [];
                        this.sections.forEach(section => {
                            this._genericfilterservice.getTeams(section._id).subscribe((_teams: Array<any>) => {
                                let team = _teams;
                                this.checkAll = true;
                                if (team) {//console.log("tesams",team);                          
                                    this.teams = [...this.teams, ...team];
                                }
                                // this.tempTeams=[(Object.assign({},this.teams))];//use map funtion here instead of object.assign
                                this.tempTeams = this.teams.map((team) => team); //using map to store temporaliy 
                                console.log("temp", this.tempTeams);

                            });

                        });

                    });
                    this.disableDivision = false;
                    this.disableSection = false;
                    this.disableTeam = false;
                    this.disableDepartment = true;
                    this.showAgrregation.showDepartmentAggregation = false;
                    this.showAgrregation.showDivisionAgrregation = true;
                    this.showAgrregation.showSectionAgrregation = true;
                    this.loggedInUserRole.emit(this.showAgrregation);

                }
                else if (user.role === "Department Manager") {
                    this.role = 'Department Manager';
                    console.log("reachedD");
                    this.department = user.departments;
                    this._genericfilterservice.getDivisions(this.department[0]._id).subscribe((_divisions: Array<any>) => {
                        this.divisions = _divisions
                        this.tempdivisions.push(Object.assign({}, this.divisions));//use map funtion here instead of object.assign
                        this._genericfilterservice.getSections(this.divisions[0]._id).subscribe((_sections: Array<any>) => {
                            let section = _sections;
                            this.sections = section;
                            //console.log("sections",this.sections);
                            this.tempSections.push(Object.assign({}, this.sections));//use map funtion here instead of object.assign
                            this.teams = [];
                            this.sections.forEach(section => {
                                this._genericfilterservice.getTeams(section._id).subscribe((_teams: Array<any>) => {
                                    let team = _teams;
                                    if (team) {
                                        this.teams = [...this.teams, ...team];
                                    }
                                    this.tempTeams = [(Object.assign({}, this.teams))];//use map funtion here instead of object.assign
                                    this.checkAll = true;
                                });
                            });
                        });
                    });
                    this.role = 'Department Manager';
                    this.checkAll = true;
                    this.disableDivision = false;
                    this.disableSection = false;
                    this.disableTeam = false;
                    this.disableDepartment = false;
                    this.showAgrregation.showDepartmentAggregation = true;
                    this.showAgrregation.showDivisionAgrregation = true;
                    this.showAgrregation.showSectionAgrregation = true;
                    this.loggedInUserRole.emit(this.showAgrregation);
                    this.checkAll = true;
                }
                this.checkAll = true;
            }
        });
    }
    selectedoptions(list: Array<any>) {
        console.log('list at multi-sec', list);
        this.division = [];//check condition here
        this.section = [];
        if (list.length > 0) {
            list.forEach((eachitematlist) => {
                if (eachitematlist.source === 'division') {
                    console.log('before div', this.division);
                    this.division = [...this.division, ...(this.divisions.filter((division: any) => division._id === eachitematlist._id))];
                    this.sections = [];
                    if (this.division.length > 0) {
                        this.division.forEach((division) => {
                            console.log("temptem", this.sections);
                            //below line is used when tempTeams is assigned using map function
                            this.sections = [...this.sections, ...this.tempSections.filter((section) => section.divisionId === division._id)];
                            // below for loop is used when object.assign is used..
                            // for (var section in this.tempSections[0]) {
                            //     if (this.tempSections[0].hasOwnProperty(section)) {
                            //         var element = this.tempSections[0][section];
                            //         if(element.divisionId=== division._id )
                            //              this.sections.push(element);
                            //         else
                            //              console.log("match not found");
                            //     }
                            // }
                        });
                        console.log("emited division", this.tempdivisions);
                    }
                }
                if (eachitematlist.source === 'section') {
                    this.section = [...this.section, ...(this.sections.filter((section: any) => section._id === eachitematlist._id))];
                    console.log("secton", this.section);
                    this.teams = [];
                    if (this.section.length > 0) {
                        // this.teams = [];
                        this.section.forEach((section) => {
                            // console.log("temptem",this.teams);
                            // below line is used when tempTeams is assigned using map function
                            this.teams = [...this.teams, ...this.tempTeams.filter((team) => team.sectionId === section._id)];
                            // below for loop is used when object.assign is used..
                            // for (var team in this.tempTeams[0]) {
                            //   if (this.tempTeams[0].hasOwnProperty(team)) {
                            //      var element = this.tempTeams[0][team];
                            //          if(element.sectionId=== section._id )
                            //              this.teams.push(element);
                            //          else
                            //               console.log("match not found");                                   
                            //   }
                            // }
                            //this.teams = [...this.teams, ...section.teams];//old code not in use..
                        });
                    }
                }
                if (eachitematlist.source === 'team') {
                    console.log("emitted team", this.tempTeams);
                    this.selectedListOutput.emit(list);//we get here array of teams
                    this.selectedlistofsections.emit(this.tempSections);
                    this.selectedlistofdivisions.emit(this.tempdivisions);

                }
            });
            if (this.report == true) {
                this.selectedListOutput.emit(list);
                console.log('emit', this.tempdivisions, this.tempSections, this.tempTeams);
                this.checkAll = true;
            }
        }
        else {
            if (this.role === 'Division Manager') {
                // this.divisions = [];
                // this.sections = [];
                // this.teams = this.teams;
                // this.checkAll=false;
                this.selectedListOutput.emit(list);
            }
            if (this.role === 'Department Manager') {
                // this.sections = [];
                this.teams = [];
            }
            // this.selectedListOutput.emit(list);
            this.checkAll = false;
        }
    }
    optionsUpdated(data) {
        console.log('Selected data ', data);
    }
}