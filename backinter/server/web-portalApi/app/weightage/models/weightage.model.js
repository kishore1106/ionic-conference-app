// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var weightageSchema = new Schema( {
         source:{type: Schema.ObjectId, required: true},
         weightage:{type:Number,required:true},
         date:{type:Date,required:true}

    
});
var Weightage = mongoose.model('Weightage', weightageSchema);
module.exports = Weightage;