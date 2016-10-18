// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var teamsSchema = new Schema({
     name: {type: String, required: true},
     sectionId: {type: Schema.ObjectId, ref: 'sections', required: true }
    
});
var Team = mongoose.model('Team', teamsSchema);
module.exports = Team;