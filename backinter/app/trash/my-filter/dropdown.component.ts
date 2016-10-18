// import {Component, Input, Output, EventEmitter, ElementRef, OnInit } from 'angular2/core';
// import { TestService } from './test.service';
// import { Test } from './test';
// import { DivisionDropComponent } from './divisiondropdown.component';
// import { SectionDropComponent } from './sectiondropdown.component';
// import { TeamDropComponent } from './teamdropdown.component';



// @Component({
//   selector: 'my-dropdown',
//   templateUrl: '/trash/dropdown.component.html',
//   directives: [DivisionDropComponent, SectionDropComponent, TeamDropComponent]

// })
// export class DropdownComponent implements OnInit {
//   @Output() selected_division_id: any ;
//   @Output() selected_section_id: any;
//   @Output() selected_team_id: any;
//   mydropdownarray: Test[];
//   division_listarray:Test[];
//   section_listarray: Test[];
//   team_listarray: Test[];

//   @Input()
//   values: DropdownValue[]=[new DropdownValue("team1","tem1"),
//   new DropdownValue("team2","tem2"),
//   new DropdownValue("team3","tem3"),
//   new DropdownValue("team4","tem4")];

//   @Input()
//   value: string[];

//   @Output()
//   valueChange: EventEmitter<any>;

//   constructor(private elementRef:ElementRef,private Testservice: TestService) {
//   this.valueChange = new EventEmitter();
//    }

//   select(value) {
//     this.valueChange.emit(value);
//   }
//   constructor(private Testservice: TestService) {
   
//    }
//    get_selected_division($event)
//    {
//      console.log('selectdivision',$event);
     
//      return this.selected_division_id= ($event);
//    }
//    get_selected_section($event)
//    {
//      console.log('selectsection',$event);
     
//      return this.selected_section_id= ($event);
//    }
//    get_selected_team($event)
//    {
//      console.log('selectteam',$event);
     
//      return this.selected_team_id= ($event);
//    }

//   get_data_For_dropdown() {
//     this.Testservice.gettest().subscribe((quality) => {
//           this.mydropdownarray = quality;
//             this.get_division_list();
//       } );
//     // mydropdownarray is holding entire json file ..
//   }
//   get_division_list() {
       
//     this.division_listarray = this.mydropdownarray.filter((item) => item.section_id == item.section_id );
//      console.log(this.division_listarray);
    
//     return this.division_listarray;
//   }
//   get_section_list(selected_division_id) {
    
//     this.section_listarray = this.mydropdownarray.filter((item) => item.section_id == item.section_id && item.division_id == selected_division_id);
    

//     console.log((this.section_listarray));

    
//     return this.section_listarray;
//   }
//   get_team_list(selected_section_id) {
//     this.team_listarray = this.mydropdownarray.filter((item) => item.team_id == item.team_id && item.section_id == selected_section_id);
   
   
    
//     return this.team_listarray;
//   }
//   ngOnInit() {
//     this.get_data_For_dropdown();
 
//   }
 

// }