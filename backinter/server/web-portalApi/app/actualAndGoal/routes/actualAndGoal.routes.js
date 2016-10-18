
var actualController = require('../../actualAndGoal/controllers/actualAndGoal.controller.js');

module.exports = function (app) {

    app.route('/actualAndGoal')
        .post( actualController.create);
};
