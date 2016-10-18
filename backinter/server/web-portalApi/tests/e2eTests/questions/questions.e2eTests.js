/**
 * Created by Selotsoft on 29/05/15.
 */

var path = require('path');

describe('team e2eTests', function () {

    var configuration, firstName, lastName, email, channelName;

    beforeEach(function () {

        configuration = {
            e2eTests: {
                url: "https://cortexbox.com"
            }
        }
    });

    it('should redirect to sunsoft94 home page', function () {

        browser.get(configuration.e2eTests.url + '/sunsoft94');

        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/sunsoft94');
        });
    });

    it('should open login model popup', function () {

        element(by.css('[ng-click="scrollActive()"]')).click();

        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/sunsoft94/start');
        });
    });

    it('should login form validates user name and password ', function () {

        var countryCode;
        var mobileNumber = element(by.name('mobileNumber'));
        var password = element(by.name('password'));

        element(by.cssContainingText('bs-dropdown', "")).click();

        browser.driver.sleep(1);
        browser.waitForAngular();

        element(by.cssContainingText('[data-ng-click="selectVal(item)"]', "+91")).click();

        browser.driver.sleep(1);

        mobileNumber.clear();
        mobileNumber.sendKeys('7418415427');

        browser.waitForAngular();

        element(by.css('[ng-click="mainCtrl.isMobileUnique(getStarted.$valid)"]')).click();

        browser.waitForAngular();

        password.clear();
        password.sendKeys('123456');

        element(by.css('[ng-click="loginCtrl.index(loginfrm.$valid)"]')).click();
    });

    it('should login form validates user name and password ', function () {

        var countryCode;

        browser.driver.sleep(1);
        browser.waitForAngular();

        element(by.css('md-default-theme material-icons')).click();

        element(by.cssContainingText('[data-tileload]', 'submit')).click();


    });
});

