/**
 * Created by Selotsoft on 04/06/15.
 */


(function () {
    'use strict';

    /* Start module for all service mocks */

    angular.module('mockServiceModule', [])
        .provider('signupFactoryMockService', function mockServiceProvider() {

            var service = {};

        }).config(['$provide', 'mockServiceProvider', function ($provide, mockServiceProvider) {
            mockServiceProvider.initProvider($provide);
        }]);

    /* End module for all service mocks */

})();