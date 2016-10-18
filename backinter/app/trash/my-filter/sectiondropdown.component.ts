import { Component, OnInit,Input,Output,EventEmitter,ElementRef } from '@angular/core';

@Component({
    // moduleId: module.id,
    selector: 'my-section-dropdown',
    templateUrl: '/trash/sectiondropdown.component.html'
})
export class SectionDropComponent implements OnInit {
    constructor(private elementRef:ElementRef) {
         this.selected_section_id = new EventEmitter();
     }
@Input() section_list_array:any[];
@Output() selected_section_id: EventEmitter<any>;
onChanged_section_Id(selected_section_id){
    // emit section id  to parent component(dropdown component)
    this.selected_section_id.emit(selected_section_id);
}
    ngOnInit() { }

}