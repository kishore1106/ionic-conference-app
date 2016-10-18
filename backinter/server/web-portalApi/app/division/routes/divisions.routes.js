
var divisionsController = require('../../division/controllers/divisions.controller.js');

module.exports = function (app) {

    app.route('/divisions')
        .post( divisionsController.create)
        .get(divisionsController.getdivisionsDetails);

    app.route('/divisions/:divisionId/sections')
        .get( divisionsController.getSections);

};
