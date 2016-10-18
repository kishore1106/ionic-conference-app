import { Component, OnInit, Input, Output, SimpleChange, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from './admin.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RotatingPlaneComponent } from 'ng2-spin-kit/app/spinner/rotating-plane.component'


export interface User {
    name: string;
    address?: {
        street?: string;
        postcode?: string;
    }
}

@Component({
    // moduleId: module.id,
    selector: 'admin',
    templateUrl: '/admin/admin.component.html',

})

export class AdminComponent implements OnInit {
    /** properties to hold lists */
    departmentList: any = [];
    divisionList: any = [];
    sectionList: any = [];
    teamList: any = [];
    roleList: any = ['Team Member', 'Team Lead', 'Section Coordinator', 'Supervisor',
        'Division Coordinator', 'Division Manager', 'Department Manager'];

    /**properties to store selected value */
    selectedRole: any = "";
    selectedDepartment: any;
    selectedDivision: any;
    selectedSection: any;
    selectedTeam: any;
    /**properties to store weitage values */
    divisionWeightage: any;
    sectionWeightage: any;
    teamWeightage: any;

    /**boolean value to show add new user ui */
    createNewUser: boolean;

    // @Input() label: String;
    // status: boolean;
    // @Output() selectedListOutput: EventEmitter<any> = new EventEmitter<any>();
    // items: Array<any>;
    selectedList: any;
    disable: boolean = true;
    // select: boolean;

    newUserDetails = {
        firstName: "",
        lastName: "",
        cwsId: "",
        role: "",
        accessTo: "",
        isAdmin: false
    };
    user = {};
    disableSaveButton: boolean = false;
    isRequesting: boolean;
    enableSpinner: boolean = false;
    /**current month and year */
    currentTime: any = new Date();
    currentMonth: any = this.currentTime.getMonth();
    currentYear: any = this.currentTime.getFullYear();

    previousMonth: any;
    previousMonthDivisionWeightage: any;
    currentMonthDivisionWeightage: any;
    previousMonthSectionWeightage: any;
    currentMonthSectionWeightage: any;
    previousMonthTeamWeightage: any;
    currentMonthTeamWeightage: any;
    /** */
    constructor(private _adminService: AdminService, private _toaster: ToastsManager) {

    }

    /** ngoninit code starts here */
    ngOnInit() {
        this.isRequesting = true;
        // this._adminService.getAllRoles().subscribe((roles) => {
        //     let rolelist = roles;
        //     if (rolelist) {
        //         this.roleList = rolelist;
        //         console.log(this.roleList);

        //     }
        // });
        this._adminService.getAllTeams().subscribe((teams) => {
            this.isRequesting = true;
            let teamlist = teams;
            if (teamlist) {
                this.teamList = teamlist;
                console.log(this.teamList);
                this.isRequesting = false;
            }
        });

        this._adminService.getAllSections().subscribe((sections) => {
            this.isRequesting = true;
            let sectionlist = sections;
            if (sectionlist) {
                this.sectionList = sectionlist;
                console.log(this.sectionList);
                this.isRequesting = false;
            }
        });
        this._adminService.getAllDivisions().subscribe((division) => {
            this.isRequesting = true;
            let divisionlist = division;
            if (divisionlist) {
                this.divisionList = divisionlist;
                console.log(this.divisionList);
                this.isRequesting = false;
            }
        });
        this._adminService.getAllDepartment().subscribe((department) => {
            this.isRequesting = true;
            let departmentlist = department;
            if (departmentlist) {
                this.departmentList = departmentlist;
                console.log(this.departmentList);
                this.isRequesting = false;
            }
        });
        this.isRequesting = false;
    }
    /** ngoninit code ends here */

    /** loading spinner code starts here */
    loading() {
        this.isRequesting = true;
    }
    /** loading spinner code ends here */



    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if ((this.divisionWeightage) != null) {
            console.log("lists", this.divisionWeightage);
            // this.selectedList = this.lists[0];
            //      this.items=this.lists; 
            // console.log("this.items", this.items);
            // setTimeout(() => { this.selectedListOutput.emit(this.selectedList); });
        }
    }

    addnewuser() {
        this.createNewUser = true;
        this.changeWeightage = false;
        this.moveTeam = false;

    }
    changeWeightage: boolean;
    changeweightage() {
        this.changeWeightage = true;
        this.createNewUser = false;
        this.moveTeam = false;
    }
    moveTeam: boolean;
    movingATeam() {
        this.moveTeam = true;
        this.createNewUser = false;
        this.changeWeightage = false;
    }
    onSelectRole() {
        console.log("selected role", this.selectedRole);
        this.newUserDetails.role = this.selectedRole;
    }
    onSelectDepartment() {
        if (this.selectedRole = 'Department Manager') {
            this.newUserDetails.accessTo = this.selectedDepartment._id;
            console.log("selected division", this.selectedDepartment);
        }
        else {
            console.log("all department are listed", this.departmentList);
        }
    }

    onSelectDivision() {
        if (this.selectedRole == 'Division Coordinator' || this.selectedRole == 'Division Manager') {
            this.newUserDetails.accessTo = this.selectedDivision._id;
            console.log("selected division", this.selectedDivision);
            // console.log("this.divisionList", this.selectedDivision);
            //this.divisionWeightage = this.selectedDivision.weightage;
            //this.selectedListOutput.emit(this.selectedList);
            // this.newUserDetails.divisionId=this.selectedDivision._id;
        }
        else {
            console.log("all divisions are listed", this.divisionList);
            /**code to get weightage */
            this._adminService.getWeigtagesByID(this.selectedDivision._id).subscribe((weightage) => {
                this.isRequesting = true;
                let divisionWeightage = weightage;
                if (divisionWeightage) {
                    this.divisionWeightage = divisionWeightage;
                    console.log('weightage', this.divisionWeightage[0].weightageData[this.divisionWeightage[0].weightageData.length - 1].weightagevalue);
                    this.previousMonth = this.divisionWeightage[0].weightageData[this.divisionWeightage[0].weightageData.length - 1].date
                    //var month=this.previousMonth.getFullYear();
                    var month = new Date(this.previousMonth);//
                    console.log(month);

                    this.previousMonthDivisionWeightage = this.divisionWeightage[0].weightageData[this.divisionWeightage[0].weightageData.length - 1].weightagevalue;
                    this.currentMonthDivisionWeightage = this.previousMonthDivisionWeightage;
                    this.isRequesting = false;
                }
            });
            /**code ends here */
        }
    }
    onSelectSection() {
        if (this.selectedRole == 'Section Coordinator' || this.selectedRole == 'Supervisor') {
            this.newUserDetails.accessTo = this.selectedSection._id;
            console.log("selected sections", this.selectedSection);
            // console.log("selected list: ", this.selectedList);
            //console.log("this.divisionList", this.selectedDivision);
            //this.sectionWeightage = this.selectedDivision.weightage;
            // this.newUserDetails.sectionId=this.selectedSection._id;
            //this.selectedListOutput.emit(this.selectedList);
        }
        else {
            console.log("all sections are listed", this.sectionList);
            /**code to get weightage */
            this._adminService.getWeigtagesByID(this.selectedSection._id).subscribe((weightage) => {
                this.isRequesting = true;
                let sectionWeightage = weightage;
                if (sectionWeightage) {
                    this.sectionWeightage = sectionWeightage;
                    console.log('weightage', this.sectionWeightage[0].weightageData[this.sectionWeightage[0].weightageData.length - 1].weightagevalue);
                    //this.previousMonth = this.divisionWeightage[0].weightageData[this.divisionWeightage[0].weightageData.length - 1].date
                    //var month=this.previousMonth.getFullYear();
                    var month = new Date(this.previousMonth);//
                    console.log(month);

                    this.previousMonthSectionWeightage = this.sectionWeightage[0].weightageData[this.sectionWeightage[0].weightageData.length - 1].weightagevalue;
                    this.currentMonthSectionWeightage = this.previousMonthSectionWeightage;
                    this.isRequesting = false;
                }
            });
            /**code ends here */
        }
    }
    onSelectTeam() {
        this.newUserDetails.accessTo = this.selectedTeam._id;
        console.log("selected team", this.selectedTeam);
        //this.teamWeightage = this.selectedDivision.weightage;
        /**code to get weightage */
            this._adminService.getWeigtagesByID(this.selectedTeam._id).subscribe((weightage) => {
                this.isRequesting = true;
                let teamWeightage = weightage;
                if (teamWeightage) {
                    this.teamWeightage = teamWeightage;
                    console.log('weightage', this.teamWeightage[0].weightageData[this.teamWeightage[0].weightageData.length - 1].weightagevalue);
                    this.previousMonth = this.teamWeightage[0].weightageData[this.teamWeightage[0].weightageData.length - 1].date
                    //var month=this.previousMonth.getFullYear();
                    var month = new Date(this.previousMonth);//
                    console.log(month);

                    this.previousMonthTeamWeightage = this.teamWeightage[0].weightageData[this.teamWeightage[0].weightageData.length - 1].weightagevalue;
                    this.currentMonthTeamWeightage = this.previousMonthTeamWeightage;
                    this.isRequesting = false;
                }
            });
            /**code ends here */
    }
    /** save new user method code starts here */
    saveUser() {
        if ((this.newUserDetails.firstName && this.newUserDetails.cwsId && this.newUserDetails.role && this.newUserDetails.accessTo) != "") {
            this.disableSaveButton == false;
            this._adminService.addNewUser(this.newUserDetails).subscribe((_user) => {
                this.isRequesting = true;
                let user = _user;
                if (user) {
                    this.user = user;
                    console.log("saved successfully", this.user);
                    this.isRequesting = false;
                }
                else {
                    console.log("data is still fetch ");
                }
            });
            if (this.user != null) {
                this.newUserDetails = {
                    firstName: "",
                    lastName: "",
                    cwsId: "",
                    role: "",
                    accessTo: "",
                    isAdmin: false
                }
            }
        }
        else {
            this._toaster.success('Your Changes has been Saved!', 'Success!');
            this.disableSaveButton = true;
            console.log("no entry");
        }
    }
    /** save new user method code ends here */

    onSubmit() {
        console.log("saved successfully");
        this._toaster.success('Your Changes has been Saved!', 'Success!');
        console.log("weightage", this.divisionWeightage, this.sectionWeightage, this.teamWeightage);
    }
    onselecfromdepartment() {
        var fromdepartment = "";
        fromdepartment = this.selectedDepartment;
        this._adminService.getAllDivisionsByDepartmentID(fromdepartment).subscribe((division) => {
            let divisionlist = division;
            if (divisionlist) {
                this.divisionList = divisionlist;
                console.log(this.divisionList);
            }
        });
    }
    onselecfromdivision() {
        var fromdivision = "";
        fromdivision = this.selectedDepartment;
        this._adminService.getAllDivisionsByDepartmentID(fromdivision).subscribe((division) => {
            let divisionlist = division;
            if (divisionlist) {
                this.divisionList = divisionlist;
                console.log(this.divisionList);
            }
        });
    }
    onselecfromsection() {
        var fromsection = "";
        fromsection = this.selectedDepartment;
        this._adminService.getAllDivisionsByDepartmentID(fromsection).subscribe((division) => {
            let divisionlist = division;
            if (divisionlist) {
                this.divisionList = divisionlist;
                console.log(this.divisionList);
            }
        });
    }
    onselecfromteam() {
        var fromteam = "";
        fromteam = this.selectedDepartment;
    }
    /** testfunction  code starts here */
    onclickSubmitForWeightage() {
        if(this.currentMonthDivisionWeightage != undefined && this.currentMonthDivisionWeightage != "" )
        {
            this.checkForAvailablityOfCurrentMonthData(this.divisionWeightage,this.currentMonthDivisionWeightage);
            this._adminService.postNewDivisionWeightagedetils(this.selectedDivision._id, this.divisionWeightage[0].weightageData).subscribe((divisionWeightage) => {
            let _divisionWeightage = divisionWeightage;
            if (_divisionWeightage) {
                console.log("updated division weightage", _divisionWeightage);

            }
        })
        
    }
    if(this.currentMonthSectionWeightage != undefined && this.currentMonthSectionWeightage != "" )
        {
            this.checkForAvailablityOfCurrentMonthData(this.sectionWeightage,this.currentMonthSectionWeightage);
            this._adminService.postNewDivisionWeightagedetils(this.selectedSection._id, this.sectionWeightage[0].weightageData).subscribe((sectionWeightage) => {
            let _sectionWeightage = sectionWeightage;
            if (_sectionWeightage) {
                console.log("updated section weightage", _sectionWeightage);

            }
        })
        
    }
    if(this.currentMonthTeamWeightage != undefined && this.currentMonthTeamWeightage != "" )
        {
            this.checkForAvailablityOfCurrentMonthData(this.teamWeightage,this.currentMonthTeamWeightage);
            this._adminService.postNewDivisionWeightagedetils(this.selectedTeam._id, this.teamWeightage[0].weightageData).subscribe((teamWeightage) => {
            let _teamWeightage = teamWeightage;
            if (_teamWeightage) {
                console.log("updated   team weightage", _teamWeightage);

            }
        })
        
    }
       
    this._toaster.success('Your Changes has been Saved!', 'Success!');  
    }
     /** testfunction  code ends here */


      /**  method to check whether the month is currrent month code starts here */
  
     checkForAvailablityOfCurrentMonthData(weightagedetails:any,weightagevalue:number) {
         
        var lastMonthInWeightagedetails = weightagedetails[0].weightageData[(weightagedetails[0].weightageData.length - 1)].date
        var date = new Date(lastMonthInWeightagedetails);
        var month = date.getMonth();
        var year = date.getFullYear();
        
        if (this.currentMonth != month && this.currentYear === year) {
            weightagedetails[0].weightageData.push({ date: new Date(this.currentTime).toISOString(), weightagevalue: weightagevalue })
            console.log("updated Weightage", weightagedetails);
        }
        if (this.currentMonth === month && this.currentYear === year) {
            weightagedetails[0].weightageData[(weightagedetails[0].weightageData.length - 1)].weightagevalue = weightagevalue;
        }
        if (this.currentMonth != month && this.currentYear === (year + 1)) {
            console.log('new year');
        }
    }
     /**  method to check whether the month is currrent month code starts here */
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /**  method to check whether the month is currrent month code starts here */
    // checkForAvailablityOfCurrentMonthData() {
    //     var date = new Date(this.previousMonth);
    //     var month = date.getMonth();
    //     var year = date.getFullYear();
    //     if (this.currentMonth != month && this.currentYear === year) {
    //         this.divisionWeightage[0].weightageData.push({ date: new Date(this.currentTime).toISOString(), weightagevalue: this.currentMonthDivisionWeightage })
    //         console.log("this.divisionWeightage", this.divisionWeightage);
    //     }
    //     if (this.currentMonth === month && this.currentYear === year) {
    //         this.previousMonthDivisionWeightage = this.currentMonthDivisionWeightage;
    //     }
    //     if (this.currentMonth != month && this.currentYear === (year + 1)) {
    //         console.log('new year');
    //     }
    // }
    /**  method to check whether the month is currrent month code starts here */




















































    // public myForm: FormGroup;
    // public submitted: boolean;
    // public events: any[] = [];

    // constructor(private _fb: FormBuilder) { }

    // ngOnInit() {
    //     // the long way
    //     // this.myForm = new FormGroup({
    //     //     name: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
    //     //     address: new FormGroup({
    //     //         address1: new FormControl('', <any>Validators.required),
    //     //         postcode: new FormControl('8000')
    //     //     })
    //     // });

    //     // the short way
    //     this.myForm = this._fb.group({
    //         name: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
    //         address: this._fb.group({
    //             street: ['', <any>Validators.required],
    //             postcode: ['8000']
    //         })
    //     });

    //     // subscribe to form changes  
    //     this.subcribeToFormChanges();

    //     // Update single value
    //     (<FormControl>this.myForm.controls['name'])
    //         .setValue('John', { onlySelf: true });

    //     // Update form model
    //     // const people = {
    //     // 	name: 'Jane',
    //     // 	address: {
    //     // 		street: 'High street',
    //     // 		postcode: '94043'
    //     // 	}
    //     // };

    //     // (<FormGroup>this.myForm)
    //     //     .setValue(people, { onlySelf: true });

    // }

    // subcribeToFormChanges() {
    //     const myFormStatusChanges$ = this.myForm.statusChanges;
    //     const myFormValueChanges$ = this.myForm.valueChanges;

    //     myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
    //     myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    // }

    // save(model: User, isValid: boolean) {
    //     this.submitted = true;
    //     console.log(model, isValid);
    // }



