
var velocityController = require('../../velocity/controllers/velocity.controller.js');

module.exports = function (app) {

    app.route('/velocity')
        .post(velocityController.create);
       

};
