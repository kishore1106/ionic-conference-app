
var teamsController = require('../../teams/controllers/teams.controller.js');
var auth = require('../../.././config/auth');

module.exports = function (app) {

    app.route('/teams')
        .post( teamsController.create)
        .get(teamsController.getTeamsDetails);

    app.route('/teams/:teamId/velocity')
       
        .get(teamsController.getVelocityByTeam)
        .post(teamsController.updateVelocityByTeam);

    app.route('/sections/:sectionId/velocity')
       
        .get(teamsController.getVelocityBySection)
        .post(teamsController.updateVelocityBySection);

   app.route('/teams/:teamId/quality')
       
        .get(teamsController.getQualityByTeam)
        .post(teamsController.updateQualityByTeam);

    app.route('/sections/:sectionId/quality')
       
        .get(teamsController.getQualityBySection)
        .post(teamsController.updateQualityBySection);
    app.route('/divisions/:divisionId/quality')

        .get(teamsController.getQualityByDivision)
        .post(teamsController.updateQualityByDivision);
    app.route('/divisions/:divisionId/velocity')

        .get(teamsController.getVelocityByDivision)
        .post(teamsController.updateVelocityByDivision);


};