/**
 * Created by SelotSoft on 5/23/2015.
 */

exports.config = {

    //specs: ['tests/e2eTests/login/login.e2eTests.js'],

    specs: [
        //'tests/e2eTests/signup/singup.links.e2eTests.js'],
        //'tests/e2eTests/signup/signup.e2eTests.js'],
        //'tests/e2eTests/signup/signup.mobile.e2eTests.js'],
        //'tests/e2eTests/signup/signup.verify.e2eTests.js'],
        //'tests/e2eTests/signup/signup.confirm.e2eTests.js' ],
        'tests/e2eTests/questions/questions.e2eTests.js'],

    //capabilities: {'browserName': 'chrome'},

    //capabilities: {'browserName': ['firefox', 'chrome', 'safari']},

    multiCapabilities: [
//        {
//            'browserName': 'firefox'
//        }
// ,
        {
            'browserName': 'chrome'
        }
//        ,
//        {
//            'browserName': 'safari'
//        }
    ],

    allScriptsTimeout: 30000,

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true,
        includeStackTrace: true
    }
};