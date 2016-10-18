/**
 * Created by ravi
 */


var express = require('express'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    morgan = require('morgan');

var config = require('../config/config');
var cookieParser = require('cookie-parser');



module.exports = function () {

    var app = express();


    app.use(cookieParser());



    app.set('views', './app');

    app.set('view engine', 'ejs');

    var filename = __dirname.replace("\config","");

    app.use(express.static(filename + '/public/',{maxAge:3600000}));

//    app.use(express.static('/public/'));

    // configure body-parser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.set('trust proxy', true);



    // configure morgan
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    // app.use(function noCache(req, res, next) {

    //     res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    //     res.header("Pragma", "no-cache");
    //     res.header("Expires", 0);
    //     next();
    // });

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

//    var router = express.Router();

    // configure routes

    require('../app/users/routes/user.routes.js')(app);
    require('../app/quality/routes/quality.routes.js')(app);
    require('../app/velocity/routes/velocity.routes.js')(app);
    require('../app/teams/routes/teams.routes.js')(app);
    require('../app/division/routes/divisions.routes.js')(app);
    require('../app/department/routes/department.routes.js')(app);
    require('../app/sections/routes/sections.routes.js')(app);
    require('../app/access/routes/access.routes.js')(app);
    require('../app/reports/routes/reports.routes.js')(app);
    require('../app/weightage/routes/weightage.routes.js')(app);
    require('../app/DivisionWeightages/routes/weightage.routes.js')(app);
    require('../app/actualAndGoal/routes/actualAndGoal.routes.js')(app);
    return app;
};