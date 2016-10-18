import { Component, OnInit,Input,Output,EventEmitter,ElementRef } from '@angular/core';

@Component({
    // moduleId: module.id,
    selector: 'my-team-dropdown',
    templateUrl: '/trash/teamdropdown.component.html'
})
export class TeamDropComponent implements OnInit {
    constructor(private elementRef:ElementRef) {
         this.selected_team_id = new EventEmitter();
     }
@Input() team_list_array:any[];
@Output() selected_team_id: EventEmitter<any>;s
onChanged_team_Id(selected_team_id){
    
    // emit team id  to parent component(dropdown component)
    this.selected_team_id.emit(selected_team_id);
}
    ngOnInit() { console.log(this.team_list_array);
     }

}