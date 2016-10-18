import { Component, OnInit } from '@angular/core';
import { QualityTableComponent } from '.././quality-table/quality.table.component';
//import { GenericFilterComponent } from '.././generic-filter/generic.filter.component';
import { MultiSelectComponent } from '.././ng2-multiselect/multi.select.component';
import { SaveComponent } from '.././save/save.component';
import { GraphComponent } from './graph-component/graph.component';
import { ReportDataService } from './reportdata.service';


@Component({
  selector: 'report',
  templateUrl: 'report/report.component.html',
  //directives: [MultiSelectComponent,GraphComponent],
  providers: [ReportDataService]
})
export class ReportComponent implements OnInit {
  constructor(private _reportdataservice: ReportDataService) { }
  report: boolean = true;
  selectedSection: any;
  
  currentTime = new Date();
  year: number = this.currentTime.getFullYear();
  reportDetails: any = {
    sectionId: '',
    sectionName: '',
    Data: [

    ]
  };
  years: any = [
    { id: this.currentTime.getFullYear() },
    { id: this.currentTime.getFullYear() - 1 }


  ];
  months: any = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  fileName: string = 'TES';
  reportDetailsQualityArray: any;
  reportDetailsVelocityArray: any;
  ngOnInit() {
    // this.getDetailsForReport(this.fileName);
  }
  getDetailsForReport(sectionId: string) {
    this._reportdataservice.getQualityDetailsBySectionId(sectionId).subscribe((qualityData: Array<any>) => {
      console.log("qualityData", qualityData);
      // this.reportDetails = qualityData;//here it is passed as reference
      // console.log("report data:", this.reportDetails);
      if (qualityData.length > 1) {
        qualityData.reduce((previousSection, currentSection) => {
          var tempSection = {
            sectionId: previousSection.sectionId,
            sectionName: this.selectedSection[0].name,
            actual: previousSection.actual + currentSection.actual / 12,
            goal: previousSection.goal + currentSection.goal / 12,
            Data: []
          };
          // console.log("TemperorySection",tempSection);
          tempSection.Data = [];
          previousSection.qualityData.forEach((previousSectionMonthData, index) => {
            // tempSection.qualityData[index] = 
            var monthData = {
              month: new Date(previousSectionMonthData.date).getMonth(),
              year: previousSectionMonthData.year,
              label: this.months[new Date(previousSectionMonthData.date).getMonth()],
              qualityImprovement: 0,
              qualitytargetval: 25,
              externalToCat: 0,
              externalToAcsd: 0,
              // onTimeDelivery: 20,
              // productiveImprovement: 23,
              // productivitytargetval: 21
            };
            var currentSectionMonthData = currentSection.qualityData[index];
            if (currentSectionMonthData) {
              monthData.qualityImprovement=(previousSectionMonthData.defects + currentSectionMonthData.defects);
              // monthData.qualityImprovement = (tempSection.actual - (previousSectionMonthData.defects + currentSectionMonthData.defects)) / tempSection.actual;
              //monthData.defects = (this.ActualDataInQualityImprovementIMSS - (previousSectionMonthData.defects + currentSectionMonthData.defects))/this.ActualDataInQualityImprovementIMSS;// it should be calculated in percentage
              monthData.externalToAcsd = previousSectionMonthData.defectsExtAcsd + currentSectionMonthData.defectsExtAcsd;
              monthData.externalToCat = previousSectionMonthData.defectsExtCat + currentSectionMonthData.defectsExtCat;
              tempSection.Data.push(monthData);
            }
            else {

              console.log("curent data is undefined");

              monthData.qualityImprovement = previousSectionMonthData.defects;
              //monthData.defects = (this.ActualDataInQualityImprovementIMSS - (previousSectionMonthData.defects + currentSectionMonthData.defects))/this.ActualDataInQualityImprovementIMSS;// it should be calculated in percentage
              monthData.externalToAcsd = previousSectionMonthData.defectsExtAcsd;
              monthData.externalToCat = previousSectionMonthData.defectsExtCat;
              tempSection.Data.push(monthData);
            }
          })
          // console.log("*****tempsection******", tempSection);
          this.reportDetailsQualityArray = tempSection;
          console.log("******reportDetailsQualityArray*****", this.reportDetailsQualityArray);
          return tempSection;
        })
        // this.departmentaggregatedvalue = false;
      }
    });
    this._reportdataservice.getVelocityDetailsBySectionId(sectionId).subscribe((velocityData: Array<any>) => {
      if (velocityData.length > 1) {
        
        var velocityMonths = velocityData.length;
        console.log("velocityMonths", velocityMonths);
        velocityData.reduce((previousSection, currentSection) => {
          var tempSection = {
            sectionId: previousSection.sectionId,
            sectionName: this.selectedSection[0].name,
            Data: []
          };
          tempSection.Data = [];
          previousSection.velocityData.forEach((previousSectionMonthData, index) => {
           
            // tempSection.qualityData[index] = 
            var monthData = {
              month: new Date(previousSectionMonthData.date).getMonth(),
              year: previousSectionMonthData.year,
              label: this.months[new Date(previousSectionMonthData.date).getMonth()],
              // qualityImprovement: 0,
              // qualitytargetval: 25,
              // externalToCat: 0,
              // externalToAcsd: 0,
              onTimeDelivery: 0,
              productiveImprovement: 0,
              productivityTargetval: 25
            };
            var currentSectionMonthData = currentSection.velocityData[index];
            if (currentSectionMonthData) {
              console.log("aray",tempSection.Data.length);
              monthData.onTimeDelivery = (previousSectionMonthData.deliveredOnTimeRelease + currentSectionMonthData.deliveredOnTimeRelease)/tempSection.Data.length;
              monthData.productiveImprovement = previousSectionMonthData.cumulativeCycTime + currentSectionMonthData.cumulativeCycTime;
              tempSection.Data.push(monthData);
            }
            else {
              console.log("curent data is undefined");
              monthData.onTimeDelivery = previousSectionMonthData.deliveredOnTimeRelease;
              //monthData.defects = (this.ActualDataInQualityImprovementIMSS - (previousSectionMonthData.defects + currentSectionMonthData.defects))/this.ActualDataInQualityImprovementIMSS;// it should be calculated in percentage
              monthData.productiveImprovement = previousSectionMonthData.cumulativeCycTime;
              tempSection.Data.push(monthData);
            }
          })
          // console.log("*****tempsection******", tempSection);
          this.reportDetailsVelocityArray = tempSection;
          console.log("******reportDetailsVelocityArray*****", this.reportDetailsVelocityArray);
          return tempSection;
        })
        // this.departmentaggregatedvalue = false;
      }
      else {
        // this.sectionLevelQualityDetails = listOfTeams;

        // this.departmentaggregatedvalue = false;
      }
      // if(this.reportDetailsQualityArray.length>1 && this.reportDetailsVelocityArray.length>1){

      // }
    });


    // console.log('this.sectionLevelQualityDetails', this.reportDetails);
    // this.sectionaggregatedvalue = true;
  }
  //this.disableTeamDropdown.emit(this.sectionaggregatedvalue);//to disable team drop drown
  selectList(selectedSection) {
    this.selectedSection = selectedSection;
    console.log("emitteddddd at the report", this.selectedSection);
    if (this.selectedSection.length > 0) {
      this.getDetailsForReport(this.selectedSection[0]._id);
    }
  }
  onSelectYear(yearId) {
    
    // this.year= yearId;
    this.getDetailsForReport(this.selectedSection[0]._id);
    console.log("year selected", this.year);
  }

}