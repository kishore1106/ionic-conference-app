// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    cwsId : {type: String, required: true},
    role: {type: String, required: true, enum: ['Team Member', 'Team Lead', 'Section Coordinator', 'Supervisor', 'Division Coordinator', 'Division Manager', 'Department Manager']},
    accessTo :{type: String, required: true},
    isAdmin:{type: Boolean, default: false},
   
    createdDate: {type: Date, default: Date.now}


});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;