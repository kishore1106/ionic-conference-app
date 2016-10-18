/**
 * Created by ravi
 */
process.env.NODE_ENV = process.env.NODE_ENV || "development";
//process.env.NODE_ENV = process.env.NODE_ENV || "test";

// Express configuration
var express = require('./config/express');
var config = require('./config/config');
var mongoose = require('mongoose');
 var fs = require('fs'),
    https = require('https'),
    //express = require('express'),
    app = express();

// var app = express();



mongoose.connect(config.db);
var connection = mongoose.connection;

connection.on('error', function (err) {
    console.log('mongodb connection error: %s', err);
    process.exit();
});
connection.on('open', function () {
    console.log('Successfully connected to mongodb');

});


app.get('/ss', function (req, res, next) {
    res.end('index');
});


// var userController = require('./app/users/controllers/user.controller.js');



// console.log('routes');
//     app.route('/users')
//         .post( userController.create);

//     app.route('/user/:userId')
//         .get( userController.getUser);

//     app.route('/users/:userId')
//         .get( userController.getUserDetails);

//         app.route('/test')
//         .get(function (req, res, next) {
//             res.write('write');
//             res.end();
//         });
        



// var server = app.listen(8001);

    https.createServer({
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    }, app).listen(8001);

module.exports = app;

console.log("Server running at 8001");