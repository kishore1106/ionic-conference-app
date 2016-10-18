import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';

import { MultiSelectComponent } from '../../ng2-multiselect/multi.select.component';

import { IList } from './IList';


@Component({
    // moduleId: module.id,
    selector: 'my-generic-selector',
    templateUrl: 'generic-filter/generic-selector/generic.selector.component.html',
   //directives:[MultiSelectComponent]

})
export class GenericSelectorComponent implements OnInit, OnChanges {
    selectedList: IList;
    disable: boolean;
    // select: boolean;
    constructor() { }
    @Input() lists: Array<IList>;
    @Input() label: String;
    @Input() status: boolean;
    @Output() selectedListOutput: EventEmitter<IList> = new EventEmitter<IList>();
    items:Array<any>;
    ngOnInit() {
        //this.selectedList=this.lists[0];
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if ((this.lists) != null) {
            console.log("lists", this.lists);
            this.selectedList = this.lists[0];
                 this.items=this.lists; 
            console.log("this.items", this.items);
            setTimeout(() => { this.selectedListOutput.emit(this.selectedList); });
        }
    }

    onSelect() {
        // console.log("selected list: ", this.selectedList);
        this.selectedListOutput.emit(this.selectedList);
    }
}