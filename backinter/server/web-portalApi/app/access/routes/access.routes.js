
var accessController = require('../../access/controllers/access.controller.js');

module.exports = function (app) {

    app.route('/access')
        .post(accessController.create)
        .get(accessController.getaccessDetails);

};
