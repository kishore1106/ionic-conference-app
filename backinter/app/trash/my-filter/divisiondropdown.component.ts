import { Component, OnInit,Input,Output,EventEmitter,ElementRef } from '@angular/core';

@Component({
    // moduleId: module.id,
    selector: 'my-division-dropdown',
    templateUrl: '/trash/divisiondropdown.component.html'
})
export class DivisionDropComponent implements OnInit {
    constructor(private elementRef:ElementRef) {
         this.selected_divison_id = new EventEmitter();
     }
@Input() division_list_array:any[];
@Output() selected_divison_id: EventEmitter<any>;
onChanged_division_Id(selected_divison_id){
    // emit division id  to parent component(dropdown component)
    this.selected_divison_id.emit(selected_divison_id);
}
    ngOnInit() { 
        
        console.log(this.division_list_array);
     }


}