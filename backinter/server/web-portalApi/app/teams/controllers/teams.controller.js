var Teams = require('../models/teams.model');
var Velocities = require('../.././velocity/models/velocity.model');
var Qualities = require('../.././quality/models/quality.model');
var Section = require('../.././sections/models/sections.model');
var Division = require('../.././division/models/divisions.model');
var mongoose = require('mongoose');

// create a new user called chris
var teams = new Teams({
    name: 'Telematics',
    sectionId: '57d7d9c77423bbd02502dce9'
});

exports.create = function (req, res, next) {

    // call the built-in save method to save to the database
    teams.save(function (err, result) {
        if (!err) {
            console.log('teams details saved successfully!');
            res.status(201).json(result.toObject());
        } else {
            next(err);
        }
    });
};

exports.getTeamsDetails = function (req, res, next) {
    // get all the users
    var query = Teams.find();
    query.exec(function (err, teamsDetails) {
        if (!err) {
            res.status(200).json(teamsDetails);
            res.end('teams')
        } else {
            next(err);
        }
    });
};
exports.getVelocityByTeam = function (req, res, next) {
    // get all the users
    var year = req.query.year;
    var start = new Date(year, 1, 1);
    var end = new Date(year, 12, 31);
    var query;

    if (!year) {
        query = Velocities.find({
            teamId: req.params.teamId
        });
    } else {
        query = Velocities.aggregate({ $match: {teamId: mongoose.Types.ObjectId(req.params.teamId)}},
            { $unwind: '$velocityData'},
            { $match: {'velocityData.date': {$gt: start, $lt: end}}},
            { $group: {_id: '$_id', velocityData: {$push: '$velocityData'}}});
    }


//    var query = Qualities.findOne({teamId: req.params.teamId, 'qualityData.date': {$gte: start, $lte: end}});
    query.exec(function (err, velocity) {
        if (!err) {

            res.status(200).json(velocity);
        } else {
            next(err);
        }
    });
};

exports.updateVelocityByTeam = function (req, res, next) {


    Velocities.findOneAndUpdate({
        teamId: req.params.teamId
    }, {
        "velocityData": req.body
    }, {
        new: true
    }, function (err, result) {
        if (!err) {
            res.status(200).json(result);
        } else {
            next(err);
        }
    });
};
exports.getVelocityBySection = function (req, res, next) {
    // get all the users
    var query = Velocities.find({
        sectionId: req.params.sectionId
    });
    query.exec(function (err, velocity) {
        if (!err) {
            res.status(200).json(velocity);
        } else {
            next(err);
        }
    });
};

// need to work
exports.updateVelocityBySection = function (req, res, next) {

    Velocities.findOneAndUpdate({
        sectionId: req.params.sectionId
    }, {
        "velocityData": req.body
    }, {
        new: true
    }, function (err, result) {
        if (!err) {
            res.status(200).json(result);
        } else {
            next(err);
        }
    });
};

exports.getVelocityByDivision = function (req, res, next) {
    // get all the users
    var query = Velocities.find({
        divisionId: req.params.divisionId
    });
    query.exec(function (err, velocity) {
        if (!err) {
            res.status(200).json(velocity);
        } else {
            next(err);
        }
    });
};

exports.updateVelocityByDivision = function (req, res, next) {

    Velocities.findOneAndUpdate({
        divisionId: req.params.divisionId
    }, {
        "velocityData": req.body
    }, {
        new: true
    }, function (err, result) {
        if (!err) {
            res.status(200).json(result);
        } else {
            next(err);
        }
    });
};

exports.getQualityByTeam = function (req, res, next) {
    // get all the users
    var year = req.query.year;
    var start = new Date(year, 1, 1);
    var end = new Date(year, 12, 31);
    var query;

    if (!year) {
        query = Qualities.find({
            teamId: req.params.teamId
        });
    } else {
        query = Qualities.aggregate({ $match: {teamId: mongoose.Types.ObjectId(req.params.teamId)}},
            { $unwind: '$qualityData'},
            { $match: {'qualityData.date': {$gt: start, $lt: end}}},
            { $group: {_id: '$_id', qualityData: {$push: '$qualityData'}}});
    }

//    var query = Qualities.findOne({teamId: req.params.teamId, 'qualityData.date': {$gte: start, $lte: end}});
    query.exec(function (err, quality) {
        if (!err) {

            res.status(200).json(quality);
        } else {
            next(err);
        }
    });
};

exports.updateQualityByTeam = function (req, res, next) {

    Qualities.findOneAndUpdate({
        teamId: req.params.teamId
    }, {
        "qualityData": req.body
    }, {
        new: true
    }, function (err, result) {
        if (!err) {
            res.status(200).json(result);
        } else {
            next(err);
        }
    });
};
// need to work
exports.getQualityBySection = function (req, res, next) {
    // get all the users
    var query = Qualities.find({
        sectionId: req.params.sectionId
    });
    query.exec(function (err, quality) {
        if (!err) {
            res.status(200).json(quality);
        } else {
            next(err);
        }
    });
};

exports.updateQualityBySection = function (req, res, next) {

    Qualities.findOneAndUpdate({
        sectionId: req.params.sectionId
    }, {
        "qualityData": req.body
    }, {
        new: true
    }, function (err, result) {
        if (!err) {
            res.status(200).json(result);
        } else {
            next(err);
        }
    });
};

exports.getQualityByDivision = function (req, res, next) {
    // get all the users
    var query = Qualities.find({
        divisionId: req.params.divisionId
    });
    query.exec(function (err, quality) {
        if (!err) {
            res.status(200).json(quality);
        } else {
            next(err);
        }
    });
};

exports.updateQualityByDivision = function (req, res, next) {

    Qualities.findOneAndUpdate({
        divisionId: req.params.divisionId
    }, {
        "qualityData": req.body
    }, {
        new: true
    }, function (err, result) {
        if (!err) {
            res.status(200).json(result);
        } else {
            next(err);
        }
    });
};