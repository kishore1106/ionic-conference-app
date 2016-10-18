
var qualityController = require('../../quality/controllers/quality.controller.js');

module.exports = function (app) {

    app.route('/quality')
        .post( qualityController.create);
        

};
