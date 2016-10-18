
var weightageController = require('../../DivisionWeightages/controllers/weightage.controller.js');

module.exports = function (app) {

    app.route('/myweightage')
        .post( weightageController.create);
        

    app.route('/myweightage/:teamId')
        .get(weightageController.getweightageforteam)
        .post(weightageController.updateWeightageByTeamId);

};
