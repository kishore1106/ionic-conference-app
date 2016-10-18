// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var ActualgoalSchema = new Schema( {
         source:{type: Schema.ObjectId, required: true},
         actual:{type:Number,required:true},
         goal:{type:Number,required:true},
         date:{type:Date,required:true} 
});
var actualAndGoal = mongoose.model('actualAndGoal', ActualgoalSchema);
module.exports = actualAndGoal;