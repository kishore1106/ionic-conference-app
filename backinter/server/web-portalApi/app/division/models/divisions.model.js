// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var divisionsSchema = new Schema(
 {
        name: {type: String, required: true},
        departmentId: {type: Schema.ObjectId, ref: 'departments', required: true }
    
});
var Divisions = mongoose.model('Divisions', divisionsSchema);
module.exports = Divisions;