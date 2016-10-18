
var userController = require('../../users/controllers/user.controller.js');


module.exports = function (app) {
console.log('routes');
    app.route('/users')
        .post( userController.create);

    app.route('/user/:userId')
        .get( userController.getUser);

    app.route('/users/:userId')
        .get( userController.getUserDetails);
        

};