import { Component, OnInit, Input, Output, OnChanges, SimpleChange, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { VelocityDataService } from './velocitydata.service';
import { IVelocity } from './Ivelocity';

@Component({
    // moduleId: module.id,
    selector: 'my-velocity-table',
    templateUrl: '/velocity-table/velocity.table.component.html',


})
export class VelocityTableComponent implements OnInit, OnChanges {
    constructor(private velocityservice: VelocityDataService) { }
    currentTime = new Date();
    indexOfMonth = this.currentTime.getMonth();
    months: any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    editableMonth: string = this.months[this.indexOfMonth];
    velocityDetails: Array<any>;
    velocityDetail: Array<any>;
    velocityMonth:any;
    year: number = this.currentTime.getFullYear();
        years: any = [
        { id: this.currentTime.getFullYear() },
        { id:  this.currentTime.getFullYear()-1}

    ];
    @Input() editableField: boolean;
    @Input() selectedList: any;
    @Output() changedvaluesofvelocity = new EventEmitter();
    ngOnInit() {
        // this.get_details();
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        console.log("selectedId", this.selectedList, this.editableField);
        let selectedlist = changes['selectedList'];
        console.log(selectedlist);

        if (selectedlist && selectedlist.currentValue && selectedlist.previousValue != selectedlist.currentValue) {

            this.get_details();

        }
    }


    get_details() {
        this.velocityDetails = [];
        console.log('***********selected id for table:', this.selectedList);
        if (this.selectedList && this.selectedList.length > 0 && this.selectedList[0].source === "team") {

            this.velocityDetails = [];
            this.selectedList.forEach(velocity => {
                this.velocityDetails = [];
                if (velocity.source === "team") {
                    console.log("velocity",velocity);
                    this.velocityservice.getVelocityDetails(velocity._id,this.year).subscribe((_details: Array<any>) => {                       
                        let details = _details;
                        // _details=[];
                        if (details && this.velocityDetails.length !== this.selectedList.length) {           
                            details[0].teamName = velocity.name;
                            details[0].sectionId=velocity.sectionId;
                            details[0].source=velocity.source;
                            details[0]._id=velocity._id;            
                            details[0].velocityData.forEach(velocityDataForEachMonth=>
                            {
                                this.velocityMonth=new Date(velocityDataForEachMonth.date).getMonth();

                                if(this.velocityMonth==this.indexOfMonth){
                                    velocityDataForEachMonth.isCurrentMonth = true;
                                } 
                                else{
                                    velocityDataForEachMonth.isCurrentMonth = false;
                                }   
                            });   


                            this.velocityDetails = [...this.velocityDetails, ...details];
                            console.log(this.velocityDetails);
                        }
                        else {
                            console.log("empty");
                        }
                        // this.selectedList=[];
                    });
                }
                // this.selectedList=[];
            });
            // this.display = true;
        }
    }
    onClickdefects(value,date, teamid, sectionid, divisionid) {
        console.log("velocitydata", this.velocityDetails);
        this.changedvaluesofvelocity.emit(this.velocityDetails);
    }
        onSelectYear(yearId) {
        this.year = yearId;
        this.get_details();
        console.log("year selected", this.year);
    }

}

