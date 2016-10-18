var Quality = require('../models/quality.model');

// create a new user called chris
var quality = new Quality({
    divisionId:'57d7d8b53b2776202970d56e',
    
    sectionId:'57d7d9c77423bbd02502dce9',

    teamId:'57f5fc2b9acc942bb06c469d',
    qualityData:[{
        date : new Date('01-01-2016'),
        defects:16,
        defectsExtAcsd:14,
        defectsExtCat:16
    },{
        date : new Date('01-02-2016'),
        defects:18,
        defectsExtAcsd:18,
        defectsExtCat:20
    },{
        date : new Date('01-03-2016'),
        defects:16,
        defectsExtAcsd:16,
        defectsExtCat:18
    },{
        date : new Date('01-04-2016'),
        defects:14,
        defectsExtAcsd:18,
        defectsExtCat:16
    }]
   
});

exports.create = function (req, res, next) {

    console.log(new Date('01-02-2016'));

    // call the built-in save method to save to the database
    quality.save(function (err,result) {
        if (!err) {

            res.status(201).json(result.toObject());
        } else {
            next(err);
        }
    });
};