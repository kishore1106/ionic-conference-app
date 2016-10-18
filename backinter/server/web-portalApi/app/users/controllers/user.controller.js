var User = require('../models/user.model');
var Access = require('../.././access/models/access.model');
var Team = require('../.././teams/models/teams.model');
var Section = require('../.././sections/models/sections.model');
var Division = require('../.././division/models/divisions.model');
var Department = require('../.././department/models/department.model');
// create a new user called chris


exports.create = function (req, res, next) {
    console.log('Users');
    var user = new User(req.body);

    // call the built-in save method to save to the database
    user.save(function (err, result) {
        if (!err) {
            res.status(201).json(result.toObject());
        } else {
            next(err);
        }
    });
};

exports.getUser = function (req, res, next) {
    var userDetails = {};

    Access
        .findOne({ userId: req.params.userId})

        .exec().then(function (access) {
            userDetails = access.toObject();


            if (access) {
                User.findById(req.params.userId, function (err, user) {


                    userDetails.firstName = user.firstName;
                    userDetails.lastName = user.lastName;
                    var permissions = userDetails.permissions;
                    if (userDetails.role == "Team Member" || userDetails.role == "Team Lead") {
                        var teamId = permissions.teams[0];
                        userDetails.teams = [];
                        Team.findById(teamId, function (err, team) {

                            userDetails.teams.push(team);
                            delete userDetails.permissions;
                            delete userDetails.__v;
                            res.status(200).json(userDetails);
                        });

                    }
                    else if (userDetails.role == "Supervisor" || userDetails.role == "Section Coordinator") {
                        var sectionId = permissions.sections[0];
                        Section.findById(sectionId, function (err, section) {
                            userDetails.sections = [];
                            userDetails.sections.push(section);
                            delete userDetails.permissions;
                            delete userDetails.__v;
                            res.status(200).json(userDetails);
                        });
                    }
                    else if (userDetails.role == "Division Manager" || userDetails.role == "Division Coordinator") {
                        var divisionId = permissions.divisions[0];
                        Division.findById(divisionId, function (err, section) {
                            userDetails.divisions = [];
                            userDetails.divisions.push(section);
                            delete userDetails.permissions;
                            delete userDetails.__v;
                            res.status(200).json(userDetails);
                        });
                    }
                    else if (userDetails.role == "Department Manager") {
                        var departmentId = permissions.departments[0];
                        Department.findById(departmentId, function (err, section) {
                            userDetails.departments = [];
                            userDetails.departments.push(section);
                            delete userDetails.permissions;
                            delete userDetails.__v;
                            res.status(200).json(userDetails);
                        });
                    }

                });
            }
        });

};

exports.getUserDetails = function (req, res, next) {
    var userDetails = {};

    User.findById(req.params.userId, function (err, user) {


        if (user.role == "Team Member" || user.role == "Team Lead") {
            var teamId = user.accessTo;
            user.teams = [];

            Team.findById(teamId, function (err, team) {

                user.teams.push(team);

                res.status(200).json(user);
            });

        }
        else if (user.role == "Supervisor" || user.role == "Section Coordinator") {
            var sectionId = user.accessTo;
            user.sections = [];
            Section.findById(sectionId, function (err, section) {

                user.sections.push(section);

                res.status(200).json(user);
            });
        }
        else if (user.role == "Division Manager" || user.role == "Division Coordinator") {
            var divisionId = user.accessTo;
            user.divisions = [];
            Division.findById(divisionId, function (err, division) {

                user.divisions.push(division);

                res.status(200).json(user);
            });
        }
        else if (user.role == "Department Manager") {
            var departmentId = user.accessTo;
            user.departments = [];
            Department.findById(departmentId, function (err, department) {

                user.departments.push(department);

                res.status(200).json(userDetails);
            });
        }

    });

};
