
var reportsController = require('../../reports/controllers/reports.controller.js');

module.exports = function (app) {

    app.route('/reports')
        .post( reportsController.create);

    app.route('/sections/:sectionId/reports')
        .get( reportsController.getReportsData);


};
