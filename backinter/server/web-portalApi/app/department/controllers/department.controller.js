var Department = require('../models/department.model');
var Divisions = require('../.././division/models/divisions.model');

// create a new user called chris
var department = new Department({
        name:'Department-ACSD'
    });

exports.create = function (req, res, next) {

    // call the built-in save method to save to the database
    department.save(function (err,result) {
        if (!err) {
            console.log('department details saved successfully!');
            res.status(201).json(result.toObject());
        } else {
            next(err);
        }
    });
};

exports.getdepartmentDetails = function(req,res,next){
    // get all the users
    var query = Department.find();
    query.exec(function(err, departmentDetails) {
        if (!err) {
            res.status(200).json(departmentDetails);
        } else {
            next(err);
        }
    });
};

exports.getDivisions = function(req,res,next){
    // get all the users
    var query = Divisions.find({departmentId:req.params.departmentId});
    query.exec(function(err, divisions) {
        if (!err) {
            res.status(200).json(divisions);
        } else {
            next(err);
        }
    });
};