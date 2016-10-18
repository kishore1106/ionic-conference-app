import { Component, OnInit } from '@angular/core';
import { LoginService } from './loginservice.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
var jwt_Decode = require('jwt-decode');

@Component({
    // moduleId: module.id,
    selector: 'my-login',
    template:`<my-spinner [isRunning]="isRequesting"></my-spinner>`
    //templateUrl: '/login/login.component.html'
})
export class LoginComponent implements OnInit {
    constructor(private _loginservice: LoginService, private _router:Router, private _authorizationService:AuthService) { }
    tempAccessToken: any;
    redirectedURL: any;
    isLoggedIn:boolean=false;
  isRequesting:boolean;
    ngOnInit() {
          this.isRequesting=true;
        let accessData = this._loginservice.parseUrl(window.location.hash);
        console.log('Access data', accessData);
        let accessToken: string;
        accessData.forEach(data => {
            if(data.key === '#access_token') {
                accessToken = data.value;
            }
            if(data.key === 'error'){
                console.log('error');
                
            }
            if(data.key === "" && data.value === undefined){
                this._loginservice.getAccessToken();
            }
        });
        console.log('Access token ', accessToken);
        if(accessToken) {
            localStorage.setItem('accessToken', accessToken);
            //sessionStorage.setItem('accessToken', accessToken);
            var decoded = jwt_Decode(accessToken);//decode the jwt and get the cws id or cat login id;
            console.log('decoded',decoded);
            
            this._authorizationService.login();
            this.isRequesting = false;
            this._router.navigate(['/quality']);
            
        }
    }

    checkisLogged() {
        if (this.isLoggedIn == false) {
            this._loginservice.getAccessToken();
        }
    }
    onClickExtractToken() {
        var url = window.location.href
        var extractedDataFromUrl = this.parseUrl(url);
        console.log("url", extractedDataFromUrl);
    }
    /* Parse the url method starts */
    parseUrl(url) {

        var parameters = url.split('&');
        var result = parameters.map((parameter) => {
            var item = parameter.split(/=(.*)/);
            return {
                key: item[0],
                value: item[1]
            };
        });
        return result;
    }
    /* Parse the url method ends */

}