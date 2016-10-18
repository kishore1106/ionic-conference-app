// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var velocitySchema = new Schema({
    divisionId:{type: Schema.ObjectId, ref: 'divisions', required: true },
    
    sectionId:{type: Schema.ObjectId, ref: 'sections', required: true },
   
    teamId:{type: Schema.ObjectId, ref: 'teams', required: true },
  
    velocityData:[{
         date:{type:Date,required:true},
        cumulativeCycTime:Number,
        deliveredOnTimeRelease:Number
    }]
    
});

var Velocity = mongoose.model('Velocity',velocitySchema);

module.exports = Velocity;