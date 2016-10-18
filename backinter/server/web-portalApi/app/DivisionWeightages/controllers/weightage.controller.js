var AllWeightage = require('../models/weightage.model');
//var Qualities = require('../.././quality/models/quality.model');
// var Divisions = require('../.././division/models/divisions.model');

// create a new user called chris
var weightage = new AllWeightage({
        source:'57d7d92972ecf1040389ffff',
        weightageData:[{
            weightagevalue:45,
            date:new Date('01-01-2016')
        },{
            weightagevalue:55,
            date:new Date('01-02-2016')
        }]
    });

exports.create = function (req, res, next) {

    // call the built-in save method to save to the database
    var myweightage = new AllWeightage(req.body);
    myweightage.save(function (err,result) {
        if (!err) {
            console.log('weightage details saved successfully!');
            res.status(201).json(result.toObject());
        } else {
            next(err);
        }
    });
};

// exports.getweightageDetails = function(req,res,next){
//     // get all the users
//     var query = Department.find();
//     query.exec(function(err, departmentDetails) {
//         if (!err) {
//             res.status(200).json(departmentDetails);
//         } else {
//             next(err);
//         }
//     });
// };

exports.getWeightage = function(req,res,next){
    // get all the users
    var query = Qualities.find({teamId:req.params.source});
    query.exec(function(err, teamsWeightage) {
        if (!err) {
            res.status(200).json(teamsWeightage);
        } else {
            next(err);
        }
    });
};
exports.getweightageforteam = function(req,res,next){
    // get all the users
    var query = AllWeightage.find({source:req.params.teamId});
    query.exec(function(err, teamsWeightage) {
        if (!err) {
            res.status(200).json(teamsWeightage);
        } else {
            next(err);
        }
    });
};
exports.updateWeightageByTeamId = function (req,res,next) {
     AllWeightage.findOne({
        source: req.params.teamId
    }, function (err, result) {
        if (!err) {
            //result.weightageData.push(req.body);
            result.weightageData = req.body;
            result.save(function (err,updatedobject) {
                if(err){
                    console.log(err);
                    res.status(500).send();
                }
                else{
                    res.send(updatedobject);
                }
            });
           
        } else {
            next(err);
        }
    });
};
exports.updateWeightageByDivisionId = function (req,res,next) {
     AllWeightage.findOneand({
        source: req.params.divisionId
    }, function (err, result) {
        if (!err) {
            result = req.body;
            result.save(function (err,updatedobject) {
                if(err){
                    console.log(err);
                    res.status(500).send();
                }
                else{
                    res.send(updatedobject);
                }
            });
           
        } else {
            next(err);
        }
    });
};
//  {
//         $push:{"weightageData": {weightagevalue:req.body.weightagevalue,month:req.body.month}}
//     }, {
//         safe: true,new: true
//     },