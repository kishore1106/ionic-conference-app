var actualAndGoal = require('../models/actualAndGoal.model');
// var Qualities = require('../.././quality/models/quality.model');

// var Divisions = require('../.././division/models/divisions.model');

// create a new user called chris
var actualAndGoal = new actualAndGoal({
    source: ('57d7da1dd110c7cc2a2bb880'),
    actual: 22,
    goal:20,
    date: new Date('01-01-2016')
}
);

exports.create = function (req, res, next) {

    // call the built-in save method to save to the database
    actualAndGoal.save(function (err, result) {
        if (!err) {
            console.log('actual details saved successfully!');
            res.status(201).json(result.toObject());
        } else {
            next(err);
        }
    });
};