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

    it('should redirect  to /signup/confirm', function () {

        browser.get(configuration.e2eTests.url + '/signup/confirm');

        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/signup/confirm');
        });
    });

    it('should /signup/verify page validates password', function () {

        var password = element(by.name('password'));

        password.sendKeys('password');

        browser.driver.sleep(1);
        browser.waitForAngular();

        password.clear();

        var validMsg = browser.findElement(by.css('[ng-message="required"]'));

        expect(validMsg.getText()).toBe("Please enter your password.");

    });

    it('should /signup/verify page validates password is valid', function () {

        var password = element(by.name('password'));

        password.sendKeys('pass');

        browser.driver.sleep(1);
        browser.waitForAngular();

        var validMsg = browser.findElement(by.css('[ng-message="pattern"]'));

        expect(validMsg.getText()).toBe("Password Must be 6-12 characters. May contain uppercase & lowercase letters, numbers, underscores, or hyphens.");

    });

    it('should /signup/verify page validates confirmPassword', function () {

        var password = element(by.name('confirmPassword'));

        password.sendKeys('confirmPassword');

        browser.driver.sleep(1);
        browser.waitForAngular();

        password.clear();

        var validMsg = browser.findElement(by.css('[ng-message="required"]'));

        expect(validMsg.getText()).toBe("Please enter confirm password.");

    });

    it('should /signup/verify page validates password and confirmpassword r same', function () {

        var password = element(by.name('password'));
        var cnfpassword = element(by.name('confirmPassword'));

        password.sendKeys('confirmPassword');
        cnfpassword.sendKeys('confirmPasswo');

        browser.driver.sleep(1);
        browser.waitForAngular();

        var validMsg = browser.findElement(by.css('[ng-message="error"]'));

        expect(validMsg.getText()).toBe("Passwords don't match.");

    });

    it('should /signup/confirm page redirects to /signup/configureSettings', function () {

        browser.get(configuration.e2eTests.url + '/signup/configureSettings');

        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/signup/configureSettings');
        });

    });
});
