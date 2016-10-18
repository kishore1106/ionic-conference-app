import {Component, OnInit} from '@angular/core';
// import {Router} from 'angular2/router';
// import { Observable } from 'rxjs/Rx';
import { VelocityTableComponent } from '.././velocity-table/velocity.table.component';
//import { GenericFilterComponent } from '.././generic-filter/generic.filter.component';
import { MultiSelectComponent } from '.././ng2-multiselect/multi.select.component';
import { SaveComponent } from '.././save/save.component';
import { IList } from '.././generic-filter/generic-selector/IList';

@Component({
    selector: 'velocity',
    templateUrl:'/velocity/velocity.component.html',
   // directives: [MultiSelectComponent,VelocityTableComponent,SaveComponent]    
})
export class VelocityComponent implements OnInit{
    
 constructor() { }

    editableField:boolean=true;
    selectedList: Array< IList>;
    changedVelocityAarray:any;
    ngOnInit() { }

      selectList(list:Array< IList>) {
        // console.log('table details', list);
        this.selectedList = list.map(item=>item);
        // console.log('req id', this.selectedList);
    }
    changedvaluesofvelocitytable(changedVelocityAarray){
        this.changedVelocityAarray = changedVelocityAarray;
        // console.log('changed deta at report:',this.changedVelocityAarray);
        
    }
     disableEdit(edit){
    this.editableField=edit;
    console.log("ediiittttiiiiinnngggg",this.editableField);
  }
    editrights(edit){
        this.editableField=edit;
        console.log('rights:',this.editableField);
        
    }
}