
var weightageController = require('../../weightage/controllers/weightage.controller.js');

module.exports = function (app) {

    app.route('/weightage')
        .post( weightageController.create);
        

    app.route('/velocityWeightage/:teamId')
        .get(weightageController.getWeightage);
        


};
