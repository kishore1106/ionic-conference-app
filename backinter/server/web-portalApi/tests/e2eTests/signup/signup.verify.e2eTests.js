/**
 * Created by Selotsoft on 06/06/15.
 */

var path = require('path');

describe('team e2eTests', function () {

    var configuration, firstName, lastName, email, accountName;

    beforeEach(function () {

        configuration = {
            e2eTests: {
                url: "http://localhost:3000"
            }
        }
    });

    it('should redirect  to /signup/verify', function () {

        browser.get(configuration.e2eTests.url + '/signup/verify');

        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/signup/verify');
        });
    });

    it('should /signup/verify page validates verificationcode', function () {

        var verifycode = element(by.name('verification'));

        browser.driver.sleep(1);
        browser.waitForAngular();

        verifycode.sendKeys('1234');
        verifycode.clear();

        element(by.css('[ng-click="mainCtrl.validateVerificationCode()"]')).click();

        var validMsg = browser.findElement(by.css('[ng-message="required"]'));

        expect(validMsg.getText()).toBe("Please enter your verification code.");

    });

    it('should /signup/verify page validates verification code is valid', function () {

        var verifycode = element(by.name('verification'));

        browser.driver.sleep(1);
        browser.waitForAngular();

        verifycode.sendKeys('12345');
        verifycode.clear();
        verifycode.sendKeys('123');

        element(by.css('[ng-click="forgotPassword()"]')).click();
        element(by.cssContainingText(".dropdown-toggle", "")).click();

        var validMsg = browser.findElement(by.css('[ng-message="minlength"]'));

        expect(validMsg.getText()).toBe("Please enter valid verification code.");
    });

    it('should /signup/verify page redirects to /signup/confirm', function () {

        browser.get(configuration.e2eTests.url + '/signup/confirm');

        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/signup/confirm');
        });
    });
});
