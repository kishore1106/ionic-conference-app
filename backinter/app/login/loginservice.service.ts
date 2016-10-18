import { Injectable } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';
import { AuthService } from './auth.service';

@Injectable()
export class LoginService {
     CLIENT_ID = "ForestProHarvest_client";
	 LOGIN_URL = "https://fedloginqa.cat.com/as/authorization.oauth2";
	 LOGOUT_URL = "";
	 REDIRECT_URI = "https://localhost.cat.com:8080/";
	 AUTHENTICATED_URLS = /((dspappservice\.azurewebsites\.net)|(services-qa|fedloginqa)\.cat\.com)/;
	AUTHENTICATED_URLS_EXCEPTIONS = "";
	exturl:any;
	constructor() {}
	//mystore:WindowLocalStorage;
 getAccessToken() {
		//redirect to get access_token

         var scope = encodeURIComponent("openid profile");
		var state = encodeURIComponent(window.location.href.replace(/&/g, ";"));
		var redirect = encodeURIComponent(this.REDIRECT_URI);
		var redirectToUrl = this.LOGIN_URL + "?client_id=" + this.CLIENT_ID + "&scope=" + scope + "&response_type=token&pfidpadapterid=OAuthAdapterCCDS" + "&redirect_uri=" + redirect + "&client_id=" + this.CLIENT_ID + "&state=" + state; 
		console.log("redirectToUrl",redirectToUrl);
		window.location.href = redirectToUrl;
		// var extractedurl = window.location.href.split('=');
		// this.exturl=extractedurl[1];
		// console.log('exturl',this.exturl);
	 }
	 	/* Parse the url method starts */
parseUrl(url) {

 		var parameters = url.split('&');
 		var result = parameters.map((parameter) =>{
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



























































// //function to parse the url query string
// 	private parseQueryString = function(url) {
// 		var params = {}, queryString = url.substring(1),
// 		regex = /([^&=]+)=([^&]*)/g, m;
// 		while (m = regex.exec(queryString)) {
// 			params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
// 		}
// 		return params;
// 	}
// 	private params = this.parseQueryString(location.hash);
// 	public access_token:string = null;
	
// 	constructor() {}
// 		//check for id_token or access_token in url
       
// 		// if (this.params["id_token"] != null)
// 		// 	this.getAccessToken();
// 		// else if (this.params["access_token"] != null)
// 		// 	this.access_token = this.params["access_token"];
            
	


//  /* Login method starts */	
// 	// login() {

//     //     //check for id_token or access_token in url
//     //     // if (this.params["id_token"] != null)
// 	// 	// 	this.getAccessToken();
// 	// 	// else if (this.params["access_token"] != null)
// 	// 	// 	this.access_token = this.params["access_token"];

// 	// 	//redirect to get id_token
// 	// 	// window.location.href = "https://login.microsoftonline.com/" + SvcConsts.TENTANT_ID + 
// 	// 	// 	"/oauth2/authorize?response_type=id_token&client_id=" + SvcConsts.CLIENT_ID + 
// 	// 	// 	"&redirect_uri=" + encodeURIComponent(window.location.href) + 
// 	// 	// 	"&state=SomeState&nonce=SomeNonce";
//     //     // var scope = encodeURIComponent("openid profile");
// 	// 	// var state = encodeURIComponent(window.location.href.replace(/&/g, ";"));
// 	// 	// var redirect = encodeURIComponent(this.REDIRECT_URI);
// 	// 	// var redirectToUrl = this.LOGIN_URL + "?client_id=" + this.CLIENT_ID + "&scope=" + scope + "&response_type=token&pfidpadapterid=OAuthAdapterCCDS" + "&redirect_uri=" + redirect + "&client_id=" + this.CLIENT_ID + "&state=" + state; 
// 	// 	// window.location.href = redirectToUrl;
// 	// }
//  /* Login method ends */

// /*get token method starts */
// 	 getAccessToken() {
// 		//redirect to get access_token

//          var scope = encodeURIComponent("openid profile");
// 		var state = encodeURIComponent(window.location.href.replace(/&/g, ";"));
// 		var redirect = encodeURIComponent(this.REDIRECT_URI);
// 		var redirectToUrl = this.LOGIN_URL + "?client_id=" + this.CLIENT_ID + "&scope=" + scope + "&response_type=token&pfidpadapterid=OAuthAdapterCCDS" + "&redirect_uri=" + redirect + "&client_id=" + this.CLIENT_ID + "&state=" + state; 
// 		window.location.href = redirectToUrl;
//         console.log("redirectToUrl",redirectToUrl);
// 	 }
// 		// window.location.href = "https://login.microsoftonline.com/" + SvcConsts.TENTANT_ID + 
// 		// 	"/oauth2/authorize?response_type=token&client_id=" + .CLIENT_ID + 
// 		// 	"&resource=" + SvcConsts.GRAPH_RESOURCE + 
// 		// 	"&redirect_uri=" + encodeURIComponent(window.location.href) + 
// 		// 	"&prompt=none&state=SomeState&nonce=SomeNonce";
// 	// }
//  /*get token method ends */


// /* Parse the url method starts */
// //     parseUrl(url) {

// // 		// var parameters = url.split('&');
// // 		// var result = _.map(parameters, function (parameter) {
// // 		// 	var item = parameter.split(/=(.*)/);
// // 		// 	return {
// // 		// 		key: item[0],
// // 		// 		value: item[1]
// // 		// 	};
// // 		// });
// // 		// return result;
// // 	}
// // /* Parse the url method ends */

// // /* should Redirect Window Location  method starts */
// //     shouldRedirectWindowLocation(currentUrl,  redirectUrl) {
// // 		var currentHostAndPath = currentUrl.split('#')[0];
// // 		var redirectHostAndPath = redirectUrl.split('#')[0];

// // 		return currentHostAndPath != redirectHostAndPath;
// // 	}
// // /* should Redirect Window Location  method ends here */

// // /* Get Route Path method starts */
// //     getRoutePath(fullUrl) {
// // 		var routePathLink = window.document.createElement('a');
// // 		routePathLink.href = fullUrl;

// // 		var hashPartUrl = routePathLink.hash.split('#');
// // 		return hashPartUrl;
// 	// }
// /* Get Route Path method ends */
// // }
// tokendata;
// accesstoken;
// get_Access_Token(){
// 	let client_id =' Xnbsaifge';
// 	let client_secret = 'yqwryiyuy';
// 	var basicheader = btoa(client_id + ':' + client_secret);
// 	var headers= new Headers();
// 	headers.append('Authorization','Basic'+basicheader);
// 	headers.append('Content-Type','aplication/X-www-form-urlencoded');

// 	var tokendata='code='+ this.ourcode +'&grant_type=authorization_code&redirect_uri=http'

// 	this.http.post('http://localhost:8080/oauth2/token',tokendata,{headers:headers}).subscribe((data)=>{
// 		this.accesstoken=data.json().access_token;
// 		this.router.navigate(['/admin']);

// 	})
// }