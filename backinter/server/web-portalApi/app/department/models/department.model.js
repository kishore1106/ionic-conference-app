// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var departmentSchema = new Schema( {
         name:{type: String, required: true}

    
});
var Department = mongoose.model('Department', departmentSchema);
module.exports = Department;                                                                                                                                                                                                                                            