/**
 * Created by Selotsoft on 29/05/15.
 */

define(['angular', 'angularMocks', 'signupModule', 'mainController'], function (angular, angularMocks, signupModule, mainController) {

    describe('Controller: public/mainController', function () {

        var scope, ctrl, $timeout, signUpFactory, deferred;

        // load the module you're testing.
        beforeEach(module('m-signup'));

        /* Start userFactory service mocking */
        var userFactoryMock, signUpFactoryMock;

//        beforeEach(function () {
//            signUpFactoryMock = jasmine.createSpyObj('signUpFactory', ['createSignUp']);
//        });

        beforeEach(inject(function (_$rootScope_, $controller, _$q_, _$timeout_, _signUpFactory_) {

            scope = _$rootScope_.$new();

            $timeout = _$timeout_;

            signUpFactory =_signUpFactory_;

            deferred = _$q_.defer();

            spyOn(signUpFactory, 'createSignUp').and.return(deferred.promise);

            ctrl = $controller('mainController', {
                $scope: scope,
                signUpFactory: signUpFactoryMock
            });
        }));

        /* End userFactory service mocking */

        it('should createAccount method haveBeenCalled', function () {

            ctrl.createBasicSignUp();
            expect(scope.tileload).toBe(true);

            expect(signUpFactory.createSignUp()).toHaveBeenCalled();

        });
    });
});
