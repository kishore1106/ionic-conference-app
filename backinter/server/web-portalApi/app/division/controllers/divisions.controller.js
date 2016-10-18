var Divisions = require('../models/divisions.model');
var Sections=require('../.././sections/models/sections.model');

// create a new user called chris

exports.create = function (req, res, next) {

    var divisions = new Divisions(req.body);


    // call the built-in save method to save to the database
    divisions.save(function (err,result) {
        if (!err) {
            console.log('division details saved successfully!');
            res.status(201).json(result.toObject());
        } else {
            next(err);
        }
    });
};

exports.getdivisionsDetails = function(req,res,next){
    // get all the users
    var query = Divisions.find();
    query.exec(function(err, divisionsDetails) {
        if (!err) {
            res.status(200).json(divisionsDetails);
        } else {
            next(err);
        }
    });
};

exports.getSections = function(req,res,next){
    // get all the users
   
    var query = Sections.find({divisionId:req.params.divisionId});
    query.exec(function(err, sections) {
        if (!err) {
            res.status(200).json(sections);
        } else {
            next(err);
        }
    });
};