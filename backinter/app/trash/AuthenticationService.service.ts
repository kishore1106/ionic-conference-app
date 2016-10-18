// import { Injectable } from '@angular/core';
// import { Constants } from './constants';

// @Injectable()
// export class AuthenticationService {
// localStorage:WindowLocalStorage;
// sessionStorage:WindowSessionStorage;
// LOGIN_URL:any;
// CLIENT_ID:any;
// REDIRECT_URI:any;
//    constructor(_constants:Constants) { 
//        this.LOGIN_URL=_constants.LOGIN_URL;
//         this.CLIENT_ID=_constants.CLIENT_ID;
//         this.REDIRECT_URI=_constants.REDIRECT_URI;

//    }

// isAuthenticated (){
// 		var localStorageAccessToken = this.localStorage.access_token;
// 		var localStorageAccessTokenExpirationDate = this.localStorage.access_token_expiration_date;

// 		var authenticated = !!localStorageAccessToken && 
// 			!!localStorageAccessTokenExpirationDate && 
// 			moment(localStorageAccessTokenExpirationDate) > moment();

// 		return authenticated;
// 	};

// 	getAccessToken() {
// 		var localStorageAccessToken = this.localStorage.access_token;

// 		if (!this.isAuthenticated())  {
// 			this.redirectToLogin();
// 			return undefined;
// 		}

// 		return localStorageAccessToken;
// 	};

// 	redirectToLogin() {
// 		// https://fedloginqa.cat.com/as/authorization.oauth2?client_id=ForestProHarvest_client&response_type=token&pfidpadapterid=OAuthAdapterCCDS&scope=openid%20profile&redirect_uri=https://localhost.cat.com:3000/callback.html'
		
// 		var scope = encodeURIComponent("openid profile");
// 		var state = encodeURIComponent(window.location.href.replace(/&/g, ";"));
// 		var redirect = encodeURIComponent(this.REDIRECT_URI);
// 		var redirectToUrl = this.LOGIN_URL + "?client_id=" + this.CLIENT_ID + "&scope=" + scope + "&response_type=token&pfidpadapterid=OAuthAdapterCCDS" + "&redirect_uri=" + redirect + "&client_id=" + this.CLIENT_ID + "&state=" + state; 
// 		window.location.href = redirectToUrl;
// 	};

// logout() {
// 		localStorage.reset();
// 		sessionStorage.reset();
// 		var logoutUrl = this.LOGOUT_URL;
// 		var self = this;
// 		setTimeout(function() {
//             window.location.href = logoutUrl;
//         })
// 	};
// }