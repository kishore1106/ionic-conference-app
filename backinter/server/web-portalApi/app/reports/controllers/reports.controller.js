var Reports = require('../models/reports.model');
var Velocities = require('../.././velocity/models/velocity.model');
var Qualities=require('../.././quality/models/quality.model');
var mongoose = require('mongoose');

exports.create = function (req, res, next) {
    var report = new Reports(req.body);

    // call the built-in save method to save to the database
    report.save(function (err, result) {
        if (!err) {
            res.status(201).json(result.toObject());
        } else {
            next(err);
        }
    });
};

exports.getReportsData = function (req, res, next) {


    var reports = {};
    reports.data = [];
    var query = Qualities.find({sectionId : req.params.sectionId});
    query.exec(function(err, quality) {
        if (!err) {
//            res.status(200).json(quality);


            if(quality){

                for(var i=0;i<quality.length ;i++){

                    for(var j=0; j  <quality[i].qualityData.length ; j++){

                        if(quality[i].qualityData[j].month == 'Jan'){
                            console.log("reached");
                        }
                    };
                };



            }

        } else {
            next(err);
        }
    });

//    Qualities.aggregate([
//        {$match: {sectionId: mongoose.Types.ObjectId(req.params.sectionId)}},
//
//        {$project: {'qualityData.defects': 1, 'count': 1}}
//    ], function (err, result) {
//        if (!err) {
//
//            res.status(200).json(result);
//        }
//        else {
//            next(err);
//        }
//    });

    Qualities.aggregate([
        {$match: {sectionId: mongoose.Types.ObjectId(req.params.sectionId)}},
        
        {$project: {'qualityData.defects': 1, 'count': 1}}
       
    ], function (err, result) {
        if (!err) {
            // result=result.qualityData[0]+result.qualityData[1];
            res.status(200).json(result);
        }
        else {
            next(err);
        }
    });
    // Qualities.mapReduce(
    //     function(){
    //         emit(this.sectionId,this.qualityData);
    //     },
    //     function(key,values){
    //         return Array.sum(values.defects)
    //     },
    //     {
    //         query:{teamName:"Team-CRM"},
    //         out:"qualityData"
    //     }
    // )

};