// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var weightageSchema = new Schema({
    month: {type: String, required: true},
    weightage: {type: Number, required: true}
});

var sectionsSchema = new Schema({
    name: {type: String, required: true},
    divisionId: {type: Schema.ObjectId, ref: 'divisions', required: true },
    weightage: [weightageSchema]

});
var Sections = mongoose.model('Sections', sectionsSchema);
module.exports = Sections;