var Weightage = require('../models/weightage.model');
var Qualities = require('../.././quality/models/quality.model');
var Velocities = require('../.././velocity/models/velocity.model');
// var Divisions = require('../.././division/models/divisions.model');

// create a new user called chris
var weightage = new Weightage({
    source: ('57d7da1dd110c7cc2a2bb880'),
    weightage: 22,
    date: new Date('03-10-2016')
});

exports.create = function (req, res, next) {

    // call the built-in save method to save to the database
    weightage.save(function (err, result) {
        if (!err) {
            console.log('weightage details saved successfully!');
            res.status(201).json(result.toObject());
        } else {
            next(err);
        }
    });
};
exports.getWeightage = function (req, res, next) {
    var weightageDetails;
    var velocityMonth;
    var velocityYear;
    var weightageMonth;
    var weightageYear;
    var velocityDetailsForTeam;
    var _velocityDataForEachMonth = {};
    var velocityDataWithWeightage = [];
    var weightage;
    var weightageSource;
    var weightageObject = {
        "0":0,
        "1":0,
        "2":0,
        "3":0,
        "4":0,
        "5":0,
        "6":0,
        "7":0,
        "8":0,
        "9":0,
        "10":0,
        "11":0,
        

    };
    var velocityDataForEachMonth = {};
    var months = [];
    velocityDataForEachMonth.weightage = '';
    var year = req.query.year;
    console.log(req.query.year);
    var startDtFormat = year + '-01-01';
    var endDtFormat = year + '-12-31';
    var startDate = new Date(startDtFormat).toISOString();
    var endDate = new Date(endDtFormat).toISOString();
    // console.log(req.params.teamId + ' ' + startDate + ' ' + endDate);
    Weightage.find({ 
            source: req.params.teamId,
            date: {
                $gte: startDate,
                $lte: endDate
            }
        })
        .sort({
            date: 1
        })
        .exec(function (err, weightageDetails) {
            console.log('Sort date ', weightageDetails);
            weightageDetails.forEach(function (weightageForEachMonth) {
                //console.log(weightageForEachMonth);
            // weightageSource = weightageForEachMonth.source;
                weightage = weightageForEachMonth.weightage;
                weightageMonth = new Date(weightageForEachMonth.date).getMonth();
                weightageObject[weightageMonth] = weightage;        
                months.push(weightageMonth);
                weightageYear = new Date(weightageForEachMonth.date).getFullYear();
            });
            
             for(var i=0;i<=11;i++){
                 if(weightageObject[i]==0){
                     weightageObject[i]=weightageObject[i-1];
                 }
             }
            console.log("weigthageObject",weightageObject);
            // console.log(weightageObject);
            var velocityData = [];
            Velocities.find({ teamId: req.params.teamId }, function (err, velocityDetails) {
                velocityDetails = velocityDetails[0].toObject();
                velocityDetails.velocityData.forEach(function (velocityDataForEachMonth) {
                    months.forEach(function (month) {                        
                        if (((velocityMonth = new Date(velocityDataForEachMonth.date).getMonth()) == month) &&
                            ((velocityYear = new Date(velocityDataForEachMonth.date).getFullYear()) == weightageYear)) {
                            // // _velocityDataForEachMonth = {};
                            // _velocityDataForEachMonth = velocityDataForEachMonth.toObject();
                            // // _velocityDataForEachMonth.weightage = weightageObject[months];
                            // // velocityDataWithWeightage.push(_velocityDataForEachMonth);
                            // // console.log(velocityDataWithWeightage);
                           
                            velocityDataForEachMonth.weightage = weightageObject[month];                            
                            // velocityData.push(_velocityDataForEachMonth);
                            // console.log('Inside if loop ', _velocityDataForEachMonth);
                            }
                    });
                });
                console.log("Weightage ",velocityDetails);
                res.json(velocityDetails);
            });
        });
};