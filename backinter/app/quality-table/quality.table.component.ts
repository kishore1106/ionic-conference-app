import { Component, OnInit, Input, Output, OnChanges, SimpleChange, EventEmitter } from '@angular/core';

import { QualityDataService } from './qualitydata.service';
import { IQuality } from './IQuality';
import {ReportComponent} from '../report/report.component';

@Component({
    selector: 'my-quality-table',
    templateUrl: '/quality-table/quality.table.component.html'
})
export class QualityTableComponent implements OnInit, OnChanges {
    display: boolean = false;
    teamName: any;
    editableMonth: boolean = false;
    currentMonthData={
        date:new Date().toISOString(),
        defects:null,
        defectsExtAcsd:null,
        defectsExtCat:null

    }
    currentTime = new Date();
    year: number = this.currentTime.getFullYear();
    month = this.currentTime.getMonth();
    months: any[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    editable_month: any = this.months[this.month];
    qualityMonth: any;
    qualityYear: any;
    qualityDetails: Array<any> = [];
    qualityDetail: Array<any> = [];
    years: any = [
        { id: this.currentTime.getFullYear() },
        { id: this.currentTime.getFullYear() - 1 }


    ];

    @Input() showAggregation = {
        showDepartmentAggregation: false,
        showDivisionAgrregation: false,
        showSectionAgrregation: false
    };


    @Input() selectedListOfdivisions=[];
    @Input() selectedListOfsections=[];
    @Input() editableField: boolean;//on submit it will be false
    @Input() selectedList: any = [];
    @Output() changedvaluesofquality = new EventEmitter();
    @Output() disableTeamDropdown = new EventEmitter<boolean>();
    @Input() listofsectionsfromdropdown:any=[];
    
    selectedlist: any;
    showDepartmentAggregation: boolean;
    showDivisionAgrregation: boolean;
    showSectionAgrregation: boolean;

    sectionaggregatedvalue: boolean = false;//change the name for this
    divisionaggregatedvalue: boolean = false;
    departmentaggregatedvalue: boolean = false;

    totalDefectsExtAcsd: number = 0;
    totalDefectsExtCat: number = 0;
    totalQualityDefect: number = 0;


    projectedvalue: number = 0;
    // @Input() agrregated:boolean;
    averageofdefect: number = 0;
    sectionLevelQualityDetails: any = [];
    divisionLevelQualityDetails: any = [];
    departmentLevelQualityDetails: any = [];
    // additional data for calculating percentage
    ActualDataInQualityImprovementIMSS: number = 43
    mypopup: boolean = false;


    count: number = 0;
    constructor(private qualityDataService: QualityDataService) { }

    ngOnInit() {
        //  setTimeout(()=>{
        //          if(this.selectedList.length>0) {
        //       this.getDetails();
        //      }   
        //         }) 
        console.log(this.showAggregation);

    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        // this.qualityDetails = [];//making the quality details array empty
        let selectedlist = changes['selectedList'];
        if (selectedlist && selectedlist.previousValue.length != selectedlist.currentValue.length) {
            console.log("Date in ui", this.currentTime);
            this.getDetails();
        }
        let aggregation = changes['showAggregation']
        if (aggregation && aggregation.previousValue != aggregation.currentValue && aggregation.currentValue != undefined) {
            console.log("aggre", aggregation);
            this.showDepartmentAggregation = this.showAggregation.showDepartmentAggregation;
            this.showDivisionAgrregation = this.showAggregation.showDivisionAgrregation;
            this.showSectionAgrregation = this.showAggregation.showSectionAgrregation;
        }
        let aggsfoation = changes['editableField']
        if (aggsfoation) {
            console.log("******aggsfoation", aggsfoation);

        }
    }
    getDetails() {
        // this.qualityDetails = [];
        console.log('***********selected id for table:', this.selectedList);
        if (this.selectedList.length > 0 && this.selectedList[0].source === "team") {//checking the emitted id is from the team
            this.qualityDetails = [];
            this.selectedList.forEach(quality => {//getting the id of each team
                // this.qualityDetails = [];
                if (quality.source === "team") {//checking whether the source(ie this id it comes from team) is team
                    console.log("this.year", this.year);
                    this.qualityDataService.getQualityDetails(quality._id, this.year).subscribe((_details: any) => {  //fetching the quality details for each team id

                        let details = _details;
                        if (details && this.qualityDetails.length != this.selectedList.length) {
                            details[0].teamName = quality.name;
                            details[0].sectionId = quality.sectionId;
                            details[0].source = quality.source;
                            details[0]._id = quality._id;
                            /**adding total defects */
                            details[0].totalNoOfDefects = 0;
                            details[0].totalDefectsExtAcsd = 0;
                            details[0].totalDefectsExtCat = 0;
                            /**adding total defects ends here*/
                            // details[0].qualityData.push(this.currentTime);
                             console.log("quality Details",details);
                             var qualityMonth=details[0].qualityData.length;
                             console.log("month",this.month);
                            //  if(this.qualityMonth!= this.month){
                                 details[0].qualityData.push(this.currentMonthData);
                            //  }
                             console.log(qualityMonth);
                            details[0].qualityData.forEach(qualityDataForEachMonth => {

                                this.qualityMonth = new Date(qualityDataForEachMonth.date).getMonth();
                                this.qualityYear = new Date(qualityDataForEachMonth.date).getFullYear();
                                console.log("qualityYear", this.qualityYear);

                                if (this.qualityMonth == this.month && this.qualityYear == this.year) {
                                    qualityDataForEachMonth.isCurrentMonth = true;
                                }
                                else {
                                    // qualityDataForEachMonth = this.currentTime;
                                    qualityDataForEachMonth.isCurrentMonth = false;
                                }
                                 /**adding total defects starts here*/
                                    details[0].totalNoOfDefects = details[0].totalNoOfDefects + qualityDataForEachMonth.defects;
                                    details[0].totalDefectsExtAcsd = details[0].totalDefectsExtAcsd + qualityDataForEachMonth.defectsExtAcsd;
                                    details[0].totalDefectsExtCat = details[0].totalDefectsExtCat + qualityDataForEachMonth.defectsExtCat; 
                                  /**adding total defects ends here*/
                            });
                            this.qualityDetails = [...this.qualityDetails, ...details];//concating the quality details for entire selected listOfTeams
                            console.log("qualityDetails", this.qualityDetails);

                            if (this.sectionaggregatedvalue === true) {
                                this.sectionaggregatedvalue = false;
                               // console.log(this.qualityDetails);
                                this.onClickSectionAggregateCheckBox();
                            }
                            else if (this.divisionaggregatedvalue === true) {
                                this.divisionaggregatedvalue = false;
                                //console.log(this.sectionLevelQualityDetails);
                                this.sectionLevelQualityDetails = [];
                                this.onClickDivisionAggregateCheckBox();
                            }
                            else {
                                // console.log("else");

                            }
                            // }
                        }
                        else {
                            // console.log("empty");
                        }

                    });


                    // this.display = true;
                }
                // this.display = true;
                this.editableMonth = false;
                console.log("editting", this.editableMonth);
            });

            // this.editableMonth = false;
            //    this.display = true;
        }
        else {
            // this.editableMonth = false;
        }
        this.display = true;
        // this.selectedList=[];
    }
    onSelectYear(yearId) {
        this.year = yearId;
        this.getDetails();
        console.log("year selected", this.year);
    }
    onClickdefects(value, date, teamid, sectionid, divisionid) {
        console.log("changed details", this.qualityDetails);
        this.changedvaluesofquality.emit(this.qualityDetails);
    }
    onCheckedAggregate() {
        console.log('aggregated value', this.sectionaggregatedvalue);
    }
/** to find section level aggregation code start here */
    onClickSectionAggregateCheckBox() {
        if (this.sectionaggregatedvalue != true) {
            this.sectionLevelQualityDetails = [];
            this.divisionaggregatedvalue = false;
            this.departmentaggregatedvalue = false;

            console.log("aggregatedvalue at quality", this.sectionaggregatedvalue);

            //below function to reduce the selectedList (remove the duplicate value i.e parentId)
            var listofsection = this.selectedList.filter((thing, index, self) =>
                self.findIndex((t) =>
                { return t.sectionId === thing.sectionId; }) === index);
            console.log('listofsection', listofsection);
              

            listofsection.forEach((section) => {
                var listOfTeams = [];
                listOfTeams = this.qualityDetails.filter((team) => section.sectionId === team.sectionId);
                console.log("listOfTeams", listOfTeams);
                //below function add the corresponding month data.
                if (listOfTeams.length > 1) {
                    listOfTeams.reduce((previousSection, currentSection) => {
                        var tempSection = {
                            divisionId: previousSection.divisionId,
                            divisionName: previousSection.divisionName,
                            sectionId: previousSection.sectionId,
                            sectionName: previousSection.sectionName,
                            qualityData: []
                        };
                        /** to find section name and division id code start here */
                       var section = this.selectedListOfsections.find((section)=>section._id === previousSection.sectionId);
                        console.log('section at temp',section);
                        /** to find section name and division id code ends here */
                        tempSection.divisionId= section.divisionId;
                        tempSection.sectionName = section.name;
                        tempSection.qualityData = [];
                        previousSection.qualityData.forEach((previousSectionMonthData, index) => {
                            // tempSection.qualityData[index] = 
                            var monthData = {
                                // year: new Date(previousSectionMonthData.date).getFullYear(),
                                // month: this.months[new Date(previousSectionMonthData.date).getMonth()],
                                teamId:previousSectionMonthData._id,
                                date:previousSectionMonthData.date,
                                defects: 0,
                                defectsExtAcsd: 0,
                                defectsExtCat: 0
                            };
                            var currentSectionMonthData = currentSection.qualityData[index];
                            console.log('previousSectionMonthData',previousSectionMonthData);
                            console.log('currentSectionMonthData',currentSectionMonthData);
                            if(currentSectionMonthData){
                                
                            monthData.defects = previousSectionMonthData.defects + currentSectionMonthData.defects;
                            //monthData.defects = (this.ActualDataInQualityImprovementIMSS - (previousSectionMonthData.defects + currentSectionMonthData.defects))/this.ActualDataInQualityImprovementIMSS;// it should be calculated in percentage
                            monthData.defectsExtAcsd = previousSectionMonthData.defectsExtAcsd + currentSectionMonthData.defectsExtAcsd;
                            monthData.defectsExtCat = previousSectionMonthData.defectsExtCat + currentSectionMonthData.defectsExtCat;
                            tempSection.qualityData.push(monthData);
                        }
                        else{
                            console.log("curent data is undefined");
                            
                            monthData.defects = previousSectionMonthData.defects ;
                            //monthData.defects = (this.ActualDataInQualityImprovementIMSS - (previousSectionMonthData.defects + currentSectionMonthData.defects))/this.ActualDataInQualityImprovementIMSS;// it should be calculated in percentage
                            monthData.defectsExtAcsd = previousSectionMonthData.defectsExtAcsd;
                            monthData.defectsExtCat = previousSectionMonthData.defectsExtCat;
                            tempSection.qualityData.push(monthData);
                        }
                        })
                        console.log("tempsection", tempSection);
                        
                        this.sectionLevelQualityDetails.push(tempSection);
                        return tempSection;
                    })
                    this.departmentaggregatedvalue = false;
                }
                else if (listOfTeams.length == 1) {
                    var section = this.selectedListOfsections.find((section)=>section._id === listOfTeams[0].sectionId);
                        listOfTeams[0].divisionId = section.divisionId;
                        listOfTeams[0].divisionName = "";
                        listOfTeams[0].sectionId = section._id;
                        listOfTeams[0].sectionName = section.name;
                        listOfTeams[0].qualityData = listOfTeams[0].qualityData;
                    if (this.sectionLevelQualityDetails.length > 0) {
                        this.sectionLevelQualityDetails = [...this.sectionLevelQualityDetails, ...listOfTeams];
                    }
                    else {
                         
                        this.sectionLevelQualityDetails = listOfTeams;
                    }
                    this.departmentaggregatedvalue = false;
                }

            });
            console.log('this.sectionLevelQualityDetails', this.sectionLevelQualityDetails);
            this.sectionaggregatedvalue = true;
        }
        else {
            this.mypopup = true;
            this.sectionaggregatedvalue = false;
            console.log("sectionaggregatedvalue is unchecked", this.sectionaggregatedvalue);
        }
        //this.disableTeamDropdown.emit(this.sectionaggregatedvalue);//to disable team drop drown
    }
/** to find section level aggregation code ends here */

/** to find division level aggregation code start here */
    onClickDivisionAggregateCheckBox() {

        if (this.divisionaggregatedvalue != true) {
            this.mypopup = true;
            this.divisionLevelQualityDetails = [];
            this.divisionaggregatedvalue = true;
            this.sectionaggregatedvalue = false;
            this.departmentaggregatedvalue = false;
            console.log("divisionaggregatedvalue at quality", this.divisionaggregatedvalue);
            if (this.sectionLevelQualityDetails.length > 0) {

                //below function to reduce the selectedList (remove the duplicate value i.e parentId)
                var listofdivisions = this.sectionLevelQualityDetails.filter((thing, index, self) =>
                    self.findIndex((t) =>
                    { return t.divisionId === thing.divisionId; }) === index);
                console.log('listofdivisions', listofdivisions);

                listofdivisions.forEach((division) => {
                    var listOfSections = [];
                    listOfSections = this.sectionLevelQualityDetails.filter((section) => section.divisionId === division.divisionId);
                    console.log("listOfSections", listOfSections);

                    //below function add the corresponding month data.
                    if (listOfSections.length > 1) {
                        listOfSections.reduce((previousDivision, currentDivision) => {
                            var tempDivision = {
                                divisionId: previousDivision.divisionId,
                                divisionName: previousDivision.divisionName,
                                sectionId: previousDivision.sectionId,
                                sectionName: previousDivision.sectionName,
                                qualityData: []
                            };
                            /** to find division name using division id code start here */
                            var division = this.selectedListOfdivisions.find((division)=>division._id === previousDivision.divisionId);
                        	console.log('division at temp',division);
                            /** to find division name using division id code ends here */
                            tempDivision.divisionName = division.name;
                            tempDivision.qualityData = [];
                            previousDivision.qualityData.forEach((previousDivisionMonthData, index) => {

                                var monthData = {
                                    // year: previousDivisionMonthData.year,
                                    // month: previousDivisionMonthData.month,
                                    _id:previousDivisionMonthData._id,
                                    date:previousDivisionMonthData.date,
                                    defects: 0,
                                    defectsExtAcsd: 0,
                                    defectsExtCat: 0
                                };
                                var currentDivisionMonthData = currentDivision.qualityData[index];
                                console.log("previousDivisionMonthData",previousDivisionMonthData);
                                
                                console.log("currentDivisionMonthData",currentDivisionMonthData);
                                if(currentDivisionMonthData){
                                    monthData.defects = previousDivisionMonthData.defects + currentDivisionMonthData.defects;// it should be calculated in percentage
                                monthData.defectsExtAcsd = previousDivisionMonthData.defectsExtAcsd + currentDivisionMonthData.defectsExtAcsd;
                                monthData.defectsExtCat = previousDivisionMonthData.defectsExtCat + currentDivisionMonthData.defectsExtCat;
                                tempDivision.qualityData.push(monthData);}
                                
                                else{
                                    console.log("current division is undefined",currentDivisionMonthData);
                                    
                                    monthData.defects = previousDivisionMonthData.defects ;// it should be calculated in percentage
                                monthData.defectsExtAcsd = previousDivisionMonthData.defectsExtAcsd;
                                monthData.defectsExtCat = previousDivisionMonthData.defectsExtCat ;
                                tempDivision.qualityData.push(monthData);
                                }
                            })
                            console.log("tempDivision", tempDivision);
                            this.divisionLevelQualityDetails.push(tempDivision);
                            return tempDivision;
                        })
                    }
                    // else {
                    //     this.divisionLevelQualityDetails = listOfSections;
                    // }
                    else if (listOfSections.length == 1) {
                           var division = this.selectedListOfdivisions.find((division)=>division._id === listOfSections[0].divisionId);
                        listOfSections[0].divisionId = division.divisionId;
                        listOfSections[0].divisionName = division.name;
                        listOfSections[0].sectionId = listOfSections[0].sectionId;
                        listOfSections[0].sectionName = listOfSections[0].sectionName;
                        listOfSections[0].qualityData = listOfSections[0].qualityData;
                        if (this.divisionLevelQualityDetails.length > 0) {
                            this.divisionLevelQualityDetails = [...this.divisionLevelQualityDetails, ...listOfSections];
                        }
                        else {
                            this.divisionLevelQualityDetails = listOfSections;
                        }
                        this.departmentaggregatedvalue = false;
                    }
                });
                console.log('this.divisionLevelQualityDetails', this.divisionLevelQualityDetails);
            }
            else {
                this.onClickSectionAggregateCheckBox();
                this.divisionaggregatedvalue = false;
                this.sectionaggregatedvalue = false;
                this.onClickDivisionAggregateCheckBox();
            }
        }
        else {
            this.mypopup = true;
            this.divisionaggregatedvalue = false;
            console.log("divisionaggregatedvalue at quality", this.divisionaggregatedvalue);
        }
    }
/** to find division level aggregation code ends here */

/** to find department level aggregation code starts here */
    onClickDepartmentAggregateCheckBox() {

        if (this.departmentaggregatedvalue != true) {
            this.mypopup = true;
            this.departmentLevelQualityDetails = [];
            this.departmentaggregatedvalue = true;
            this.sectionaggregatedvalue = false;
            this.divisionaggregatedvalue = false;
            console.log("divisionLevelQualityDetails at department", this.divisionLevelQualityDetails);
            if (this.divisionLevelQualityDetails.length > 0) {
                //below function to reduce the selectedList (remove the duplicate value i.e parentId)
                var listofdepartment = this.divisionLevelQualityDetails.filter((thing, index, self) =>
                    self.findIndex((t) =>
                    { return t.departmentId === thing.departmentId; }) === index);
                console.log('listofdepartment', listofdepartment);
                listofdepartment.forEach((department) => {
                    var listOfDivision = [];
                    listOfDivision = this.divisionLevelQualityDetails.filter((division) => division.departmentId == department.deparmentId);
                    console.log("listOfDivision", listOfDivision);
                    //below function add the corresponding month data.
                    if (listOfDivision.length > 1) {
                        listOfDivision.reduce((previousDepartment, currentDepartment) => {
                            var tempDepartment = {
                                divisionId: previousDepartment.deparmentId,
                                divisionName: previousDepartment.departmentName,
                                sectionId: previousDepartment.divisionId,
                                sectionName: previousDepartment.divisionName,
                                qualityData: []
                            };
                            tempDepartment.qualityData = [];
                            previousDepartment.qualityData.forEach((previousDepartmentMonthData, index) => {
                                var monthData = {
                                    year: previousDepartmentMonthData.year,
                                    month: previousDepartmentMonthData.month,
                                    defects: 0,
                                    defectsExtAcsd: 0,
                                    defectsExtCat: 0
                                };
                                var currentDepartmentMonthData = currentDepartment.qualityData[index];
                                monthData.defects = previousDepartmentMonthData.defects + currentDepartmentMonthData.defects;// it should be calculated in percentage
                                monthData.defectsExtAcsd = previousDepartmentMonthData.defectsExtAcsd + currentDepartmentMonthData.defectsExtAcsd;
                                monthData.defectsExtCat = previousDepartmentMonthData.defectsExtCat + currentDepartmentMonthData.defectsExtCat;
                                tempDepartment.qualityData.push(monthData);
                            })
                            console.log("tempDepartment", tempDepartment);
                            this.departmentLevelQualityDetails.push(tempDepartment);
                            return tempDepartment;
                        })
                    }
                    else {
                        this.departmentLevelQualityDetails = listOfDivision;
                    }
                });
                console.log('this.departmentLevelQualityDetails', this.departmentLevelQualityDetails);
            }
            else {
                //call section aggregation
                this.onClickSectionAggregateCheckBox();
                this.sectionaggregatedvalue = false;
                //call division aggregation
                this.onClickDivisionAggregateCheckBox();
                this.divisionaggregatedvalue = false;
                //call department aggregation
                this.departmentaggregatedvalue = false;
                this.onClickDepartmentAggregateCheckBox();
            }
        }
        else {
            this.departmentaggregatedvalue = false;
            console.log("departmentaggregatedvalue at quality", this.departmentaggregatedvalue);
        }
    }
/** to find department level aggregation code ends here */

    teamstotaldefects: any = [];
    tot: boolean;
    getTotalDefectsForTeam() {
        if (this.qualityDetail.length > 0) {
            this.qualityDetail.forEach((team) => {
                this.totalDefectsExtAcsd = 0;
                this.totalDefectsExtCat = 0;
                this.totalQualityDefect = 0;
                var temp = {
                    teamId: team.teamId,
                    teamName: team.teamName,
                    totalQualityDefect: 0,
                    totalDefectsExtAcsd: 0,
                    totalDefectsExtCat: 0,
                };
                team.qualityData.forEach((item) => {
                    this.totalQualityDefect = this.totalQualityDefect + item.defects;
                    this.totalDefectsExtCat = this.totalDefectsExtCat + item.defectsExtCat;
                    this.totalDefectsExtAcsd = this.totalDefectsExtAcsd + item.defectsExtAcsd;
                });
                temp.totalDefectsExtAcsd = this.totalDefectsExtAcsd;
                temp.totalDefectsExtCat = this.totalDefectsExtCat;
                temp.totalQualityDefect = this.totalQualityDefect;
                this.teamstotaldefects.push(temp);
            });
            console.log("this.teamstotaldefects", this.teamstotaldefects);
            this.tot = true
        }
        else {
            console.log("the quality detail is empty");
            this.tot = false;
        }
    }

    /** */
}