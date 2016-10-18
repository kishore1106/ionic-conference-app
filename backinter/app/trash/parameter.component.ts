// import { Component, OnInit } from '@angular/core';


// export class ParameterComponent implements OnInit {
//     constructor($location, $localStorage, $window) { 
//         this.$location = $location;
// 		this.$localStorage = $localStorage;
// 		this.$window = $window;
//     }

//     ngOnInit() { }

// parseUrl(url) {
// 		var parameters = url.split('&');
// 		var result = _.map(parameters, function (parameter) {
// 			var item = parameter.split(/=(.*)/);
// 			return {
// 				key: item[0],
// 				value: item[1]
// 			};
// 		});
// 		return result;
// 	}
//     shouldRedirectWindowLocation(currentUrl,  redirectUrl) {
// 		var currentHostAndPath = currentUrl.split('#')[0];
// 		var redirectHostAndPath = redirectUrl.split('#')[0];

// 		return currentHostAndPath != redirectHostAndPath;
// 	}
//     getRoutePath(fullUrl) {
// 		var routePathLink = this.$window.document.createElement('a');
// 		routePathLink.href = fullUrl;

// 		var hashPartUrl = routePathLink.hash.split('#');
// 		return hashPartUrl;
// 	}
// }