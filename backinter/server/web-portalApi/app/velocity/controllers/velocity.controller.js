var Velocity = require('../models/velocity.model');

// create a new user called chris
var velocity = new Velocity({
    divisionId:'57d7d8b53b2776202970d56e',
    
    sectionId:'57d7d9c77423bbd02502dce9',
   
    teamId:'57d7df865e674f84214a8f48',
    velocityData:[{
        year:'2016',
        month:'Jan',
        cumulativeCycTime:18,
        deliveredOnTimeRelease:20
    },{
        year:'2016',
        month:'Feb',
        cumulativeCycTime:20,
        deliveredOnTimeRelease:18
    },{
        year:'2016',
        month:'Mar',
        cumulativeCycTime:12,
        deliveredOnTimeRelease:18
    },{        
        year:'2016',
        month:'Apr',
        cumulativeCycTime:20,
        deliveredOnTimeRelease:10

    }]
    
});

exports.create = function (req, res, next) {
    // call the built-in save method to save to the database
    velocity.save(function (err,result) {
        if (!err) {
            console.log('velocity details saved successfully!');
            res.status(201).json(result.toObject());
        } else {
            next(err);
        }
    });
};