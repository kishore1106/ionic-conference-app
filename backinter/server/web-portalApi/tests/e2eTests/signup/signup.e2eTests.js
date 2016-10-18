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

    /* Start Authorization e2eTests routes*/
    it('should redirect  to getstarted page', function () {

        browser.get(configuration.e2eTests.url + '/signup');

        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/');
        });
    });

    it('should https://cortexbox.com changes information from default language to chinese ', function () {

        element(by.cssContainingText(".dropdown-toggle", "")).click();
        browser.driver.sleep(1);
        browser.waitForAngular();

        element(by.css('[data-ng-click="headerCtrl.changeLang(' + "'zh-CN'" + ',' + "'中国'" + ')"]')).click();

        var msg = element(by.css('[ng-click="mainCtrl.createBasicSignUp()"]')).getText();

        expect(msg).toBe('下一个');

    });

    it('should https://cortexbox.com changes information from chinese to english ', function () {

        element(by.cssContainingText(".dropdown-toggle", "")).click();
        browser.driver.sleep(1);
        browser.waitForAngular();

        element(by.css('[data-ng-click="headerCtrl.changeLang(' + "'en'" + ',' + "'English'" + ')"]')).click();

        var msg = element(by.css('[ng-click="mainCtrl.createBasicSignUp()"]')).getText();

        expect(msg).toBe('NEXT');

    });

    it('should https://cortexbox.com/start page validates mobile number is required', function () {

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

    it('should https://cortexbox.com/start page validates mobile number length is 10 numbers', function () {

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

        expect(validMsg.getText()).toBe("Please input a valid 10-digit mobile number.");

    });

    it('should https://cortexbox.com/start page validates mobile number format is correct', function () {

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

    it('should https://cortexbox.com/start page go to /signup page if it is new mobile number', function () {

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

    it('should https://cortexbox.com/start page go to /login page if it is already registered mobile number', function () {

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


    //it('should validate signUp page firstName is required', function () {
    //
    //    //browser.get(configuration.e2eTests.url + '/admin/signUp');
    //
    //    firstName = element(by.name('firstname'));
    //    lastName = element(by.name('lastname'));
    //
    //    firstName.sendKeys('john smith');
    //    lastName.sendKeys('');
    //
    //    browser.waitForAngular();
    //
    //    firstName.clear();
    //
    //    var validMsg = browser.findElement(by.css('[ng-message="required"]'));
    //
    //    expect(validMsg.getText()).toBe("Please enter your first name.");
    //
    //});
    //
    //it('should validate signUp page lastname is required', function () {
    //
    //    //browser.get(configuration.e2eTests.url + '/admin/signUp');
    //
    //    firstName = element(by.name('firstname'));
    //    lastName = element(by.name('lastname'));
    //
    //    firstName.sendKeys('john smith');
    //    lastName.sendKeys('');
    //
    //    browser.waitForAngular();
    //
    //    lastName.clear();
    //
    //    var validMsg = browser.findElement(by.css('[ng-message="required"]'));
    //
    //    expect(validMsg.getText()).toBe("Please enter your last name.");
    //
    //});
    //
    //it('should validate signUp page email is required', function () {
    //
    //    //browser.get(configuration.e2eTests.url + '/admin/signUp');
    //
    //    email = element(by.name('email'));
    //    lastName = element(by.name('lastname'));
    //
    //    email.sendKeys('');
    //    lastName.sendKeys('a');
    //
    //    browser.waitForAngular();
    //
    //    email.clear();
    //
    //    var validMsg = browser.findElement(by.css('[ng-message="required"]'));
    //
    //    expect(validMsg.getText()).toBe("Please enter your email.");
    //
    //});
    //
    //it('should validate signUp page validating email is not a valid email', function () {
    //
    //    //browser.get(configuration.e2eTests.url + '/admin/signUp');
    //
    //    email = element(by.name('email'));
    //    lastName = element(by.name('lastname'));
    //
    //    lastName.clear();
    //    lastName.sendKeys('smith');
    //    firstName.clear();
    //    firstName.sendKeys('steve');
    //    email.sendKeys('mail@gmail');
    //
    //    browser.waitForAngular();
    //
    //    var validMsg = browser.findElement(by.css('[ng-message="pattern"]'));
    //
    //    expect(validMsg.getText()).toBe("Please input a valid email address.");
    //
    //});
    //
    //it('should validate signUp page validating email is unique', function () {
    //
    //    //browser.get(configuration.e2eTests.url + '/admin/signUp');
    //
    //    email = element(by.name('email'));
    //
    //    firstName.clear();
    //    firstName.sendKeys('steve');
    //
    //    email.clear();
    //    email.sendKeys('dheeraj@selotsoft.com');
    //
    //    browser.waitForAngular();
    //
    //    var validMsg = browser.findElement(by.css('[ng-message="unique"]'));
    //
    //    expect(validMsg.getText()).toBe("Sorry, this email address has already been registered.");
    //
    //});
    //
    //it('should validate signUp page channelName is required', function () {
    //
    //    //browser.get(configuration.e2eTests.url + '/admin/signUp');
    //
    //    channelName = element(by.name('channelName'));
    //
    //    email.clear();
    //    email.sendKeys('steven@gmail.com');
    //
    //    channelName.sendKeys('a');
    //    channelName.clear();
    //
    //    lastName.clear();
    //    lastName.sendKeys('smith');
    //
    //    browser.waitForAngular();
    //
    //    var validMsg = browser.findElement(by.css('[ng-message="required"]'));
    //
    //    expect(validMsg.getText()).toBe("Please enter your channel name.");
    //
    //});
    //
    //it('should validate signUp page channelName not accepting special characters', function () {
    //
    //    //browser.get(configuration.e2eTests.url + '/admin/signUp');
    //
    //    var channelName = element(by.name('channelName'));
    //
    //    channelName.sendKeys('ssfa1#@');
    //
    //    browser.waitForAngular();
    //
    //    var validMsg = browser.findElement(by.css('[ng-message="pattern"]'));
    //
    //    expect(validMsg.getText()).toBe("The channel name is invalid. Please enter a valid channel name.");
    //
    //});
    //
    //it('should validate signUp page channelName is unique', function () {
    //
    //    //browser.get(configuration.e2eTests.url + '/admin/signUp');
    //
    //    var channelName = element(by.name('channelName'));
    //
    //    channelName.clear();
    //
    //    channelName.sendKeys('pentela');
    //
    //    browser.waitForAngular();
    //
    //    var validMsg = browser.findElement(by.css('[ng-message="unique"]'));
    //
    //    expect(validMsg.getText()).toBe("Sorry, this channel name has already been registered.");
    //
    //});
    //
    //it('should validate signUp page channelName is available', function () {
    //
    //    //browser.get(configuration.e2eTests.url + '/admin/signUp');
    //
    //    var channelName = element(by.name('channelName'));
    //
    //    channelName.clear();
    //
    //    channelName.sendKeys('starbucks');
    //
    //    browser.waitForAngular();
    //
    //    var validMsg = element(by.css('[ng-show="!signup.channelName.$error.unique && !signup.channelName.$error.required && !signup.channelName.$error.pattern && signup.channelName.$dirty"]'));
    //
    //    expect(validMsg.getText()).toBe("Available");
    //});
    //
    //it('should validate signUp page and redirect to signup-verify state', function () {
    //
    //    //browser.get(configuration.e2eTests.url + '/admin/signUp');
    //
    //    firstName = element(by.name('firstname'));
    //    lastName = element(by.name('lastname'));
    //    email = element(by.name('email'));
    //    channelName = element(by.name('channelName'));
    //
    //    firstName.clear();
    //    firstName.sendKeys('john');
    //
    //    lastName.clear();
    //    lastName.sendKeys('smith');
    //
    //    email.clear();
    //    email.sendKeys('john@gmail.com');
    //
    //    channelName.clear();
    //    channelName.sendKeys('witwiz');
    //
    //    browser.waitForAngular();
    //
    //    element(by.css('[ng-click="mainCtrl.createBasicSignUp()"]')).click();
    //
    //    browser.waitForAngular();
    //
    //    browser.getLocationAbsUrl().then(function (url) {
    //        expect(url).toBe('/signup/mobile');
    //    });
    //});

    it('should https://cortexbox.com/start or page validates mobile number is valid', function () {

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

    it('should https://cortexbox.com validates mobile number is registered', function () {

        var mobileNumber = element(by.name('mobileNumber'));

        mobileNumber.clear();
        mobileNumber.sendKeys('9600172158');

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

    it('should /signup/mobile page redirects to /signup/verify when mobile number is valid', function () {

        var mobileNumber = element(by.name('mobileNumber'));

        mobileNumber.clear();
        mobileNumber.sendKeys('9642121296');

        browser.waitForAngular();

        element(by.cssContainingText('md-select', "")).click();

        browser.driver.sleep(1);
        browser.waitForAngular();

        element(by.cssContainingText('md-select-menu md-option', '+91')).click();

        browser.driver.sleep(1);
        browser.waitForAngular();

        element(by.css('[ng-click="mainCtrl.createMobileSignUp()"]')).click();

        browser.waitForAngular();

        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/signup/verify');
        });
    });

    it('should /signup/verify page validates verificationcode', function () {

        var verifycode = element(by.name('verification'));

        browser.driver.sleep(1);
        browser.waitForAngular();

        verifycode.sendKeys('');
        verifycode.clear();

        element(by.css('[ng-click="mainCtrl.validateVerificationCode()"]')).click();
        element(by.css('[ng-click="mainCtrl.resendCode()"]')).click();

        var validMsg = browser.findElement(by.css('[ng-message="required"]'));

        expect(validMsg.getText()).toBe("Please enter your verification code.");

    });

    it('should /signup/verify page validates verification code is valid', function () {

        var verifycode = element(by.name('verification'));

        browser.driver.sleep(1);
        browser.waitForAngular();

        verifycode.clear();
        verifycode.sendKeys('123');

        element(by.css('[ng-click="mainCtrl.validateVerificationCode()"]')).click();
        element(by.css('[ng-click="mainCtrl.resendCode()"]')).click();

        var validMsg = browser.findElement(by.css('[ng-message="minlength"]'));

        expect(validMsg.getText()).toBe("Please enter valid verification code.");
    });

    it('should /signup/verify page validates sends verification code', function () {

        element(by.css('[ng-click="mainCtrl.resendCode()"]')).click();

        var validMsg = element(by.tagName('md-toast'));

        expect(validMsg.getText()).toBe("The verification code has been resent to your mobile number @ 096 42 121296");
    });

    it('should /signup/verify page redirects to /signup/confirm', function () {

        browser.get(configuration.e2eTests.url + '/signup/confirm');

        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/signup/confirm');
        });
    });

    it('should /signup/verify page validates password', function () {

        var password = element(by.name('password'));
        var confirmPassword = element(by.name('confirmPassword'));
        password.sendKeys('1');
        password.clear();
        confirmPassword.sendKeys('confirmPassword');

        browser.driver.sleep(1);
        browser.waitForAngular();

        var validMsg = browser.findElement(by.css('[ng-message="required"]'));

        expect(validMsg.getText()).toBe("Please enter your password.");

    });

    it('should /signup/verify page validates confirmPassword', function () {

        var password = element(by.name('password'));
        var confirmPassword = element(by.name('confirmPassword'));

        confirmPassword.sendKeys('confirmPassword');

        browser.driver.sleep(1);
        browser.waitForAngular();

        confirmPassword.clear();
        password.sendKeys('asdf');

        var validMsg = browser.findElement(by.css('[ng-message="required"]'));

        expect(validMsg.getText()).toBe("Please reconfirm your password.");

    });

    it('should /signup/verify page validates password and confirmpassword r same', function () {

        var password = element(by.name('password'));
        var cnfpassword = element(by.name('confirmPassword'));

        password.sendKeys('assword');
        cnfpassword.sendKeys('asswo');

        browser.driver.sleep(1);
        browser.waitForAngular();

        var validMsg = browser.findElement(by.css('[ng-message="dvCompare"]'));

        expect(validMsg.getText()).toBe("The password you entered doesn’t match. Please try again.");

    });

    it('should /signup/confirm page redirects to /signup/configureSettings', function () {

        browser.get(configuration.e2eTests.url + '/signup/configuresettings');

        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/signup/configuresettings');
        });
    });

    it('should configure settings page timezones is required', function () {

        element(by.cssContainingText('md-select', "")).click();

        browser.driver.sleep(1);
        browser.waitForAngular();

        element(by.cssContainingText('md-select-menu md-option', '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi')).click();

        var validMsg = browser.findElement(by.css('[ng-message="required"]'));

        expect(validMsg.getText()).toBe("");

    });

    it('should configure settings page organization name is required', function () {

        var orgName = element(by.name('orgName'));

        browser.driver.sleep(1);

        orgName.sendKeys('Starbucks');
        orgName.clear();

        element(by.cssContainingText('md-select', "")).click();

        browser.driver.sleep(1);
        browser.waitForAngular();

        element(by.cssContainingText('md-select-menu md-option', '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi')).click();

        var validMsg = browser.findElement(by.css('[ng-message="required"]'));

        expect(validMsg.getText()).toBe("Please enter your organization.");

    });

    it('should configure settings redirects to /admin/profile', function () {

        var orgName = element(by.name('orgName'));

        browser.driver.sleep(1);

        orgName.sendKeys('Starbucks');

        element(by.css('[ng-click="mainCtrl.configureChannelSettings()"]')).click();

        browser.driver.sleep(1);
        browser.waitForAngular();

        browser.getLocationAbsUrl().then(function (url) {
            browser.waitForAngular();
            expect(url).toBe('/admin/profle');
        });
    });
});

