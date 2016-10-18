import { Component, OnInit, Input, Output } from '@angular/core';

import { MultiSelectComponent } from '.././ng2-multiselect/multi.select.component';
import { QualityTableComponent } from '.././quality-table/quality.table.component';
import { SaveComponent } from '.././save/save.component';
import { IList } from '.././generic-filter/generic-selector/IList';
@Component({
  // moduleId: module.id,
  selector: 'quality',
  templateUrl: '/quality/quality.component.html'
  //directives: [MultiSelectComponent, QualityTableComponent, SaveComponent]
})
export class QualityComponent implements OnInit {
  constructor() { }

  editablefield: boolean=true;
  selectedList: Array<IList>=[];
  selectedListOfsections=[];
  selectedListOfdivisions=[];
  changedQualityArray: any[];
 showAggregation:any;
  disableTeamdropdown:boolean;// to disable team dropdown while checking section level aggregation checkbox.

  ngOnInit() { 
    // localStorage.getItem('accessToken')
  }

  selectList(list: Array<IList>) {
    // console.log('table details', list);
    this.selectedList = list.map(item => item);
    console.log('req-id', this.selectedList);
  }
  changedvaluesofqualitytable(changedQaulityDetails) {
    this.changedQualityArray = changedQaulityDetails;
    // console.log('changed deta at report:',this.changedQualityArray);

  }
  editpermission(edit) {
    this.editablefield = edit;
    console.log('rights:', this.editablefield);

  }
  disableDropdown(booleanValue){

    console.log("booleanValue",booleanValue);
    this.disableTeamdropdown=booleanValue;
  }

  disableEdit(edit){
    this.editablefield=edit;
    console.log("ediiittttiiiiinnngggg",this.editablefield);
  }
  /*get user role */
  getBooleanValuesForAggregation(aggregation){
    this.showAggregation= aggregation;
    console.log("aggregation at quality",this.showAggregation);
    

  }
  selectedlistofsections(listOfSections){
    this.selectedListOfsections = listOfSections;
    console.log("this.selectedListOfsections",this.selectedListOfsections);
    
  }
  selectedlistofdivisions(listofDivisions){
    this.selectedListOfdivisions=listofDivisions;
    console.log("this.selectedListOfdivisions",this.selectedListOfdivisions);
  }
  

}