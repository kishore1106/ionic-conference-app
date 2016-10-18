'use strict';

var tests = [];

for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/unitTests\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

require.config({//paths

    //karma serves files under/base , which is the basePath from your config file
    baseUrl: '',

    paths: {
        'angular': '/base/public/assets/lib/angular/angular',
        'dropdown': '/base/public/assets/lib/bootstrap/dropdown',
        'alert': '/base/public/assets/lib/bootstrap/alert',
        'angularResource': '/base/public/assets/lib/angular/angular-resource',
        'angularAnimate': '/base/public/assets/lib/angular/angular-animate',
        'angularMaterial': '/base/public/assets/lib/angular/angular-material',
        'angularAria': '/base/public/assets/lib/angular/angular-aria',
        'angularMessages': '/base/public/assets/lib/angular/angular-messages',
        'angularSanitize': '/base/public/assets/lib/angular/angular-sanitize',
        'uiBootstrap': '/base/public/assets/lib/angular-bootstrap/ui-bootstrap',
        'imageCrop': '/base/public/assets/lib/imagecrop/imageCrop',
        'angularLoadingBar': '/base/public/assets/lib/loadingbar/loadingBar',
        'brainTree': '/base/https://assets.braintreegateway.com/v2/braintree',
        'uiRouter': '/base/public/assets/lib/angular-ui-router/ui-router',
        'angularMocks': '/base/public/assets/lib/angular/angular-mocks',
        'angularRoute': '/base/public/assets/lib/angular/angular-route',
        'jquery': 'http://code.jquery.com/jquery-1.11.2.min',
        'sharedModule': '/base/public/shared/shared.module',
        'signupModule': '/base/public/signup/signup.module',
        'mainController': '/base/public/signup/controllers/main.controller',
        'mainRoutes': '/base/public/signup/routes/main.routes',
        'signUpModel': '/base/public/shared/models/signup.model',
        'userModel': '/base/public/shared/models/user.model',
        'accountModel': '/base/public/shared/models/account.model',
        'addressModel': '/base/public/shared/models/address.model',
        'settingsModel': '/base/public/shared/models/settings.model',
        'sharedServices': '/base/public/shared/services/shared.services',
        'passwordStrength': '/base/public/assets/lib/passwordStrength/ng-password-strength',
        'phoneFormat': '/base/public/assets/lib/phoneFormat/phone-format.amd'
    },

    shim: {
        'dropdown': ['jquery'],
        'alert': ['jquery'],
        'angular': {'exports': 'angular'},
        'angularRoute': ['angular'],
        'angularResource': ['angular'],
        'angularAnimate': ['angular'],
        'angularMaterial': ['angular'],
        'angularAria': ['angular'],
        'angularSanitize': ['angular'],
        'angularMessages': ['angular'],
        'angularLoadingBar': ['angular'],
        'uiBootstrap': ['angular'],
        'imageCrop': ['angular'],
        'uiRouter': ['angular'],
        'angularMocks': ['angular'],
        'passwordStrength':['angular']
    },

    //dynamically load all test files
    deps: tests,

    //we have no kickoff jasmine , as it is asynchronous
    callback: window.__karma__.start
});