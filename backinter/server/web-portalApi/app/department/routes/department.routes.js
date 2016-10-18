
var departmentController = require('../../department/controllers/department.controller.js');

module.exports = function (app) {

    app.route('/department')
        .post( departmentController.create)
        .get(departmentController.getdepartmentDetails);

    app.route('/department/:departmentId/divisions')
        .get(departmentController.getDivisions)


};
