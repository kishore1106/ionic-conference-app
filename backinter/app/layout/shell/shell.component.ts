import { Component, OnInit} from '@angular/core';

import { GenericFilterService } from '../.././generic-filter/generic.filter.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '.././footer/footer.component';
import { SaveComponent   }from '../../save/save.component';
// import{UserDataService}from './shell.service';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
    // moduleId: module.id,
    selector: 'shell',
    templateUrl: 'layout/shell/shell.component.html',

    
})

export class ShellComponent implements OnInit{
	userDetails: Array<any>;
	userDetailsFirstName :any;
    userSections:any;
	userDetailsLastName :any;
    isAdmin:boolean=true;/// get this value from the userdetails


     isRequesting: boolean;
    constructor(private _genericfilterservice: GenericFilterService) {
       
     }
    ngOnInit() { //this.getUserDetails();
         //this.isRequesting=true;    
    }
       

    getUserDetails() {
        this._genericfilterservice.getDetails().subscribe((user:any) => {
            this.userDetailsFirstName = user.firstName;
            this.userDetailsLastName =user.lastName;
            this.userSections=user.sections;//here it is passed as reference ;
            console.log('userdetails',this.userSections);
            // console.log('userdetailslastName',this.userDetailsLastName);
            // console.log('velocity details', this.velocityDetails);
        });
    }
}
