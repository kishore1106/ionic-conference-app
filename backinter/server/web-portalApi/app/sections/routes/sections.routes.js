
var sectionsController = require('../../sections/controllers/sections.controller.js');
var divisionController=require('../../division/controllers/divisions.controller.js');
module.exports = function (app) {

    app.route('/sections')
        .post( sectionsController.create)
        .get(sectionsController.getsectionsDetails);

    app.route('/sections/:sectionId/teams')
        .get( sectionsController.getTeams);
        
    app.route('/divisions/:divisionId/sections')
        .get(divisionController.getSections);
        
    app.route('/sections/:sectionId')
        .get(sectionsController.getsectionsDetailsBySectionID);
        

};

