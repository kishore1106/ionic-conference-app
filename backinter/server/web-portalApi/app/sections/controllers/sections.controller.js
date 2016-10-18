var Sections = require('../models/sections.model');
var Teams=require('../.././teams/models/teams.model');


// create a new user called chris
var sections = new Sections({
         name:'Section_CHINAMOBILE',
        divisionId:'57d7d8b53b2776202970d56e'

    
});

exports.create = function (req, res, next) {

    // call the built-in save method to save to the database
    sections.save(function (err,result) {
        if (!err) {
            console.log('section details saved successfully!');
            res.status(201).json(result.toObject());
        } else {
            next(err);
        }
    });
};

exports.getsectionsDetails = function(req,res,next){
    // get all the users
    var query = Sections.find();
    query.exec(function(err, sectionsDetails) {
        if (!err) {
            res.status(200).json(sectionsDetails);
        } else {
            next(err);
        }
    });
};

exports.getTeams = function(req,res,next){
   
    console.log(req.params.sectionId);
    var query = Teams.find({sectionId:req.params.sectionId});
    query.exec(function(err, teamsDetails) {
        if (!err) {
            res.status(200).json(teamsDetails);
        } else {
            next(err);
        }
    });
};

exports.getSections = function(req,res,next){
    
    console.log(req.params.divisionId);
    var query = Sections.find({divisionId:req.params.divisionId});
    query.exec(function(err, sectionDetails) {
        if (!err) {
            res.status(200).json(sectionDetails);
        } else {
            next(err);
        }
    });
};
exports.getsectionsDetailsBySectionID = function(req,res,next){
    
    console.log(req.params.sectionId);
    var query = Sections.find({_id:req.params.sectionId});
    query.exec(function(err, sectionDetails) {
        if (!err) {
            res.status(200).json(sectionDetails);
        } else {
            next(err);
        }
    });
};