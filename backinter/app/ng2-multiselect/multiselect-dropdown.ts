/*
 * Angular 2 Dropdown Multiselect for Bootstrap
 * Current version: 0.1.0
 * 
 * Simon Lindh
 * https://github.com/softsimon/angular-2-dropdown-multiselect
 */

import {Component, Pipe, OnInit, HostListener, Input, ElementRef, Output, EventEmitter,SimpleChange} from '@angular/core';

import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Rx';

export interface IMultiSelectOption {
    _id: string;
    name: string;
    parentId: string;
    source: string;
   
}

export interface IMultiSelectSettings {
    pullRight?: boolean;
    enableSearch?: boolean;
    checkedStyle?: 'checkboxes' | 'glyphicon';
    buttonClasses?: string;
    selectionLimit?: number;
    closeOnSelect?: boolean;
    showCheckAll?: boolean;
    showUncheckAll?: boolean;
    dynamicTitleMaxItems?: number;
    maxHeight?: string;
}

export interface IMultiSelectTexts {
    checkAll?: string;
    uncheckAll?: string;
    checked?: string;
    checkedPlural?: string;
    searchPlaceholder?: string;
    defaultTitle?: string;
}

@Pipe({
    name: 'searchFilter'
})
export class SearchFilter {
    transform(options: Array<IMultiSelectOption>, args: string): Array<IMultiSelectOption> {
        console.log('Args ', args);
        console.log('option at drop ', options);
        console.log('options.filter((option: IMultiSelectOption) => option.name.toLowerCase().indexOf(args.toLowerCase()) > -1)',options.filter((option: IMultiSelectOption) => option.name.toLowerCase().indexOf(args.toLowerCase()) > -1));
        if(options.length>0 && typeof options[0] != "undefined"){
        return options.filter((option: IMultiSelectOption) => option.name.toLowerCase().indexOf(args.toLowerCase()) > -1);
    }
    else{
        console.log("empty at seacrch ");
        
    }
}
}

@Component({
    selector: 'multiselect-dropdown',
    styles: [`
		a { outline: none; }
	`],
    template: `
        <div class="btn-group">
            <button *ngIf="disable == false"type="button" class="dropdown-toggle btn" [ngClass]="settings.buttonClasses" (click)="toggleDropdown()">{{ getTitle() }}&nbsp;<span class="caret"></span></button>
            <button *ngIf="disable == true" type="button" class="dropdown-toggle btn disabled" [ngClass]="settings.buttonClasses">{{ getTitle() }}&nbsp;<span class="caret"></span></button>
            <ul *ngIf="isVisible" class="dropdown-menu" [class.pull-right]="settings.pullRight" [style.max-height]="settings.maxHeight" style="display: block; height: auto; overflow-y: auto;">
                <li style="margin: 0px 5px 5px 5px;" *ngIf="settings.enableSearch">
                    <div class="input-group input-group-sm">
                        <span class="input-group-addon" id="sizing-addon3"><i class="fa fa-search"></i></span>
                        <input type="text" class="form-control" placeholder="{{ texts.searchPlaceholder }}" aria-describedby="sizing-addon3" FormControl="search">
                        <span class="input-group-btn" *ngIf="searchFilterText.length > 0">
                            <button class="btn btn-default" type="button" (click)="clearSearch()"><i class="fa fa-times"></i></button>
                        </span>
                    </div>
                </li>
                <li class="divider" *ngIf="settings.enableSearch"></li>
                <li *ngIf="settings.showCheckAll">
                    <a href="#" role="menuitem" tabindex="-1" (click)="checkAll()">
                        <span style="width: 16px;" class="glyphicon glyphicon-ok"></span>
                        {{ texts.checkAll }}
                    </a>
                </li>
                <li *ngIf="settings.showUncheckAll">
                    <a href="#" role="menuitem" tabindex="-1" (click)="uncheckAll()">
                        <span style="width: 16px;" class="glyphicon glyphicon-remove"></span>
                        {{ texts.uncheckAll }}
                    </a>
                </li>
                <li *ngIf="settings.showCheckAll || settings.showUncheckAll" class="divider"></li>
                <li *ngFor="let option of options | searchFilter:searchFilterText" >
                    <a href="#" role="menuitem" tabindex="-1" (click)="setSelected($event, option) " >
                        <input *ngIf="settings.checkedStyle == 'checkboxes'" type="checkbox" [checked]="isSelected(option)" />
                        <span *ngIf="settings.checkedStyle == 'glyphicon'" style="width: 16px;" class="glyphicon" [class.glyphicon-ok]="isSelected(option)"></span>
                        {{ option.name }}
                    </a>
                </li>
            </ul>
        </div>
    `
})
export class MultiselectDropdown implements OnInit {


    @Input()disable:boolean=false;

    @Input()allChecked:boolean=false;
    selectedList:Array<any>=[];//this is emiting value( array of objects)
    @Output() selectedListFromOptions=new EventEmitter();
    @Input() options: Array<IMultiSelectOption>;
    @Input() settings: IMultiSelectSettings;
    @Input() texts: IMultiSelectTexts;
    @Input('defaultModel') selectedModel: Array<any> = [];
    @Output('selectedModel') model = new EventEmitter();
    @Output() selectionLimitReached = new EventEmitter();
    @HostListener('document: click', ['$event.target'])
    onClick(target) {
        let parentFound = false;
        while (target !== null && !parentFound) {
            if (target === this.element.nativeElement) {
                parentFound = true;
            }
            target = target.parentElement;
        }
        if (!parentFound) {
            this.isVisible = false;
        }
    }

    private numSelected: number = 0;
    private isVisible: boolean = false;
    private search = new FormControl();
    private searchFilterText: string = '';
    private defaultSettings: IMultiSelectSettings = {
        pullRight: false,
        enableSearch: false,
        checkedStyle: 'checkboxes',
        buttonClasses: 'btn btn-default',
        selectionLimit: 0,
        closeOnSelect: false,
        showCheckAll: true,
        showUncheckAll: false,
        dynamicTitleMaxItems: 3,
        maxHeight: '300px',
    };
    private defaultTexts: IMultiSelectTexts = {
        checkAll: 'Check all',
        uncheckAll: 'Uncheck all',
        checked: 'checked',
        checkedPlural: 'checked',
        searchPlaceholder: 'Search...',
        defaultTitle: 'Select',
    };

    constructor(private element: ElementRef) { }
    changeLog:any=[];

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
       // console.log('allchecked',this.allChecked);
        

        let options = changes['options'];
        if(options && options.previousValue !== options.currentValue) {
            // if(this.allChecked) {
            //     this.allChecked===true ? this.checkAll():null;
            // }
                setTimeout(()=>{
                 if(this.allChecked) {
               this.allChecked===true ? this.checkAll():null;
             }   
                })
            
        }
        
        // for (let propName in changes) {
        //     let chng = changes[propName];
        //     let cur  = JSON.stringify(chng.currentValue);
        //     let prev = JSON.stringify(chng.previousValue);
        //     this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
            
            
        // }
// console.log('changelog',this.changeLog);
          
    }

    ngOnInit() {
        this.settings = Object.assign(this.defaultSettings, this.settings);
        this.texts = Object.assign(this.defaultTexts, this.texts);
        this.updateNumSelected();
        this.search.valueChanges
            .subscribe((text: string) => {
                this.searchFilterText = text;
            });
          
    }


    clearSearch() {
        this.search.updateValueAndValidity('');
    }

    toggleDropdown() {
        this.isVisible = !this.isVisible;
        // console.log('isvissible',this.isVisible);
        
    }

    modelChanged() {
        this.updateNumSelected();
        this.model.emit(this.selectedModel);
        this.selectedListFromOptions.emit(this.selectedList);
        // console.log('list=',this.selectedList);
        
        // console.log('slected model', this.selectedModel);

    }

    isSelected(option: IMultiSelectOption): boolean {
                // console.log(this.selectedModel.indexOf(option.id));
                // console.log(this.selectedModel);
                
                
        return this.selectedModel.indexOf(option._id) > -1;
    }

    setSelected(event: Event, option: IMultiSelectOption) {
        console.log('options when unchecked',this.options);
        
        var index = this.selectedModel.indexOf(option._id);//checks whether the selectedModel contains the options indexof is used to compare opt and selected array
        // console.log('index',index);
        
        if (index > -1) {
            this.selectedModel.splice(index, 1);
            this.selectedList.splice(index,1);
        } else {
            // console.log('slection limt',this.settings.selectionLimit);
            
            if (this.settings.selectionLimit === 0 || this.selectedModel.length < this.settings.selectionLimit) {
                this.selectedModel.push(option._id);
                
                //this.selectedList.push({_id:option._id,name:option.name,source:option.source});
                this.selectedList.push(option);
            } else {
                this.selectionLimitReached.emit(this.selectedModel.length);
                console.log(' this.selectionLimitReached.emit this.selectedModel.length', this.selectedModel.length);

                return;
            }
        }
        if (this.settings.closeOnSelect) {
            this.toggleDropdown();
        }
        this.modelChanged();
        console.log('end of setselected funtions');
        
    }

    getTitle() {
        if (this.numSelected === 0) {
            return this.texts.defaultTitle;
        }
        if (this.settings.dynamicTitleMaxItems >= this.numSelected) {
                      
            return this.options
                .filter((option: IMultiSelectOption) => this.selectedModel.indexOf(option._id) > -1)
                .map((option: IMultiSelectOption) => option.name)
                .join(', ');
        }
        return this.numSelected + ' ' + (this.numSelected === 1 ? this.texts.checked : this.texts.checkedPlural);
    }

    updateNumSelected() {
        this.numSelected = this.selectedModel.length;
        // console.log('numselected',this.numSelected);
        
    }

    checkAll() {
        if(this.options.length>0 && typeof this.options[0] != "undefined"){
        this.selectedModel = this.options.map(option => option._id);
        // console.log('checkallopt',this.options);
        
        this.selectedList = this.options.map(option => option);
        // console.log('checkall',this.selectedList);
        
        this.modelChanged();
        }
        else{
            console.log("empty opt");
            
        }
    }

    uncheckAll() {
        this.selectedModel = [];
        this.selectedList=[];
        this.modelChanged();
    }

}