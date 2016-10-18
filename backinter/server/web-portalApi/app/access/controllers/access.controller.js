var Access = require('../models/access.model');

// create a new user called chris
var access = new Access({
    userId:'57e0dd2e825f9d1310412b64',
    role:'Department Manager',
    permissions:{
        departments:['57d7d82ceb6602b415010ce6'],
        divisions:['57d7d87fd470f5042a33b409','57d7d8b53b2776202970d56e'],
        sections:['57d7d8e02d2db9f01fe2833e','57d7d92972ecf1040389debd','57d7d9a5bcbcf53c2a02d964','57d7d9c77423bbd02502dce9'],
        teams:['57d7d9ff1ec8517410e1d6b0','57d7d8e02d2db9f01fe2833e','57d7daebdbfffc5817821c66','57d7db184b950764282a888f','57d7db6033af31e0243ebf08','57d7dd445bc9c7cc2afb4785','57d7df70c89cbca027c7f93c','57d7df865e674f84214a8f48']
        }
      }
   );

exports.create = function (req, res, next) {

    // call the built-in save method to save to the database
    access.save(function (err,result) {
        if (!err) {
            // console.log('teams details saved successfully!');
            res.status(201).json(result.toObject());
        } else {
            next(err);
        }
    });
};

exports.getaccessDetails = function(req,res,next){
    // get all the users
    var query = Access.find();
    query.exec(function(err, accessDetails) {
        if (!err) {
            res.status(200).json(accessDetails);
        } else {
            next(err);
        }
    });
};