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

    it('should redirect  to /signup/mobile', function () {

        browser.get(configuration.e2eTests.url + '/signup/mobile');

        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/signup/mobile');
        });
    });

    it('should /signup/mobile page validates mobile number is required', function () {

        var mobileNumber = element(by.name('mobileNumber'));

        browser.driver.sleep(1);

        mobileNumber.clear();
        mobileNumber.sendKeys('');

        browser.waitForAngular();

        element(by.cssContainingText('md-select', "")).click();

        browser.driver.sleep(1);
        browser.waitForAngular();

        element(by.cssContainingText('md-select-menu md-option', '+91')).click();

        var validMsg = browser.findElement(by.css('[ng-message="required"]'));

        expect(validMsg.getText()).toBe("Please enter your mobile number.");

    });

    it('should /signup/mobile page validates mobile number is valid', function () {

        var mobileNumber = element(by.name('mobileNumber'));

        browser.driver.sleep(1);
        browser.waitForAngular();

        mobileNumber.clear();
        mobileNumber.sendKeys('74012');

        browser.waitForAngular();

        element(by.cssContainingText('md-select', "")).click();

        browser.driver.sleep(1);
        browser.waitForAngular();

        element(by.cssContainingText('md-select-menu md-option', '+91')).click();

        browser.driver.sleep(1);
        browser.waitForAngular();

        var validMsg = browser.findElement(by.css('[ng-message="minlength"]'));

        expect(validMsg.getText()).toBe("Please input a valid 10-digit mobile number.");

    });

    it('should /signup/mobile page validates mobile number is registered', function () {

        var mobileNumber = element(by.name('mobileNumber'));

        mobileNumber.clear();
        mobileNumber.sendKeys('7401271116');

        browser.waitForAngular();

        element(by.cssContainingText('md-select', "")).click();

        browser.driver.sleep(1);
        browser.waitForAngular();

        element(by.cssContainingText('md-select-menu md-option', '+91')).click();

        browser.driver.sleep(1);
        browser.waitForAngular();

        var validMsg = browser.findElement(by.css('[ng-message="unique"]'));

        expect(validMsg.getText()).toBe("Sorry, this mobile number has already been registered.");

    });
});
