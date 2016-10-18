// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var qualitySchema = new Schema({
    divisionId:{type: Schema.ObjectId, ref: 'divisions', required: true },
    
    sectionId:{type: Schema.ObjectId, ref: 'sections', required: true },
    
    teamId:{type: Schema.ObjectId, ref: 'teams', required: true },
    qualityData:[{
        date:{type:Date,required:true},
        defects:Number,
        defectsExtAcsd:Number,
        defectsExtCat:Number
    }]
    
});

// the schema is useless so far
// we need to create a model using it
var Quality = mongoose.model('Quality', qualitySchema);

// make this available to our users in our Node applications
module.exports = Quality;