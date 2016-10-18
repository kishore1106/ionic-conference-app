/**
 * Created by Selotsoft on 29/05/15.
 */

var path = require('path');

describe('team e2eTests', function () {

    var configuration;

    beforeEach(function () {
        configuration = {
            e2eTests: {
                url: "http://localhost:8001"
            }
        }
    });


    /* Start auth e2eTests routes*/
    it('should redirect  to /login', function () {

        browser.get(configuration.e2eTests.url + '/login');

        browser.waitForAngular();

        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/login');
        });
    });

//    it('should validate login page mobileNumber is required', function () {
//
//        browser.waitForAngular();
//
//        browser.driver.sleep(1);
//
//        var mobileNumber = element(by.name('mobileNumber'));
//
//        mobileNumber.sendKeys('11');
//
//        mobileNumber.clear();
//
//        var validMsg = browser.findElement(by.css('[ng-message="required"]'));
//
//        expect(validMsg.getText()).toBe("Please enter your mobile number");
//
//    });
//
//    it('should validate login page mobileNumber not accepting any characters', function () {
//
//        var mobileNumber = element(by.name('mobileNumber'));
//
//        mobileNumber.sendKeys('entering');
//
//        browser.waitForAngular();
//
//        var validMsg = browser.findElement(by.css('[ng-message="required"]'));
//
//        expect(validMsg.getText()).toBe("");
//
//    });
//
//    it('should validate login page pin is required', function () {
//
//        var pin = element(by.name('pin'));
//
//        pin.clear();
//
//        browser.waitForAngular();
//
//        var validMsg = browser.findElement(by.css('[ng-message="required"]'));
//
//        expect(validMsg.getText()).toBe("You can't leave this empty");
//
//    });
//
//    it('should login form validates user name and password ', function () {
//
//        var countryCode;
//        var mobileNumber = element(by.name('mobileNumber'));
//        var pin = element(by.name('pin'));
//
//        element(by.cssContainingText('md-select', "")).click();
//
//        browser.driver.sleep(1);
//        browser.waitForAngular();
//
//        element(by.cssContainingText('md-select-menu md-option', '+91')).click();
//
//        browser.driver.sleep(1);
//
//        mobileNumber.clear();
//        mobileNumber.sendKeys('7401271116');
//
//        pin.clear();
//        pin.sendKeys('1234');
//
//
//        browser.waitForAngular();
//
//        element(by.css('[ng-click="mainCtrl.login()"]')).click();
//
//        browser.waitForAngular();
//
//        browser.getLocationAbsUrl().then(function (url) {
//            expect(url).toBe('/login');
//        });
//    });
//
//    it('should /login redirect ro /forgot when click on forgot link', function () {
//
//        browser.get(configuration.e2eTests.url + '/login');
//
//        element(by.css('[href="/login/forgot"]')).click();
//
//        browser.getLocationAbsUrl().then(function (url) {
//            expect(url).toBe('/login/forgot');
//        });
//    });
//
//    it('should /forgot redirect ro /login/forgot/password when click on forgot password link', function () {
//
//        element(by.css('[href="/login/forgot/password"]')).click();
//
//        browser.getLocationAbsUrl().then(function (url) {
//            expect(url).toBe('/login/forgot/password');
//        });
//    });
//
//    it('should /login/forgot/password change state to forgot-verify when click on next', function () {
//
//        var countryCode;
//        var mobileNumber = element(by.name('mobileNumber'));
//
//        element(by.cssContainingText('md-select', "")).click();
//
//        browser.driver.sleep(1);
//        browser.waitForAngular();
//
//        element(by.cssContainingText('md-select-menu md-option', '+91')).click();
//
//        browser.driver.sleep(1);
//
//        mobileNumber.clear();
//        mobileNumber.sendKeys('9840254177');
//
//        browser.waitForAngular();
//
//        element(by.css('[ng-click="mainCtrl.forgotPassword(' + forgotPasswordForm.ccode.$modelValue.code + ',' + forgotPasswordForm.mobileNumber.$modelValue + ',' + forgotPasswordForm.$valid + ')]')).click();
//
//        browser.waitForAngular();
//
//        browser.getLocationAbsUrl().then(function (url) {
//            expect(url).toBe('/login/forgot/password//verify');
//        });
//    });
});

