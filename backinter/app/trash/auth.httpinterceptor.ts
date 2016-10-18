
// import { AuthenticationService } from './AuthenticationService.service';

// export class AuthenticationHttpInterceptorService {
// AUTHENTICATED_URLS:any;
// AUTHENTICATED_URLS_EXCEPTIONS:any;

//     constructor(AuthenticationService:AuthenticationService) {
//         this.AUTHENTICATED_URLS = AUTHENTICATED_URLS; 
// 		this.AUTHENTICATED_URLS_EXCEPTIONS = AUTHENTICATED_URLS_EXCEPTIONS;
// 		this.AuthenticationService = AuthenticationService;//this. a service
//      }

// request(config:any){
//    var shouldAuthenticate = false;

// 		if (config && config.url && this.AUTHENTICATED_URLS && this.AUTHENTICATED_URLS_EXCEPTIONS) {
// 			shouldAuthenticate =  this.AUTHENTICATED_URLS.test(config.url) && !this.AUTHENTICATED_URLS_EXCEPTIONS.test(config.url);
// 		}

// 		if (!shouldAuthenticate) {
// 			return config;
// 		}

// 		config.headers = config.headers || {};

// 		var accessToken = this.AuthenticationService.getAccessToken();
// 		if (accessToken) {
// 			config.headers["Authorization"] = "Bearer " + accessToken;
// 		}

// 		return config; 
//     }
//     responseError (response) {
// 		if (response.status === 401) {
// 			this.AuthenticationService.redirectToLogin();
// 		}
// 		return response;
// 	};
// }