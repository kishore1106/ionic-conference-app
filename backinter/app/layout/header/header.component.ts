import { Component, OnInit,Input } from '@angular/core';

@Component({
    selector: 'wpHeader',
    templateUrl: 'layout/header/header.component.html',
    styleUrls: ['layout/header/header.style.css']
})
export class HeaderComponent implements OnInit {
  @Input()userDetailsFirstName:any;
  @Input()userDetailsLastName:any;
    constructor() { }

    ngOnInit() { }
    onClickLogOut(){
        if(localStorage.getItem('accessToken')){
            console.log("logout",localStorage.getItem('accessToken'));
            localStorage.removeItem('accessToken');
        }
        }

}