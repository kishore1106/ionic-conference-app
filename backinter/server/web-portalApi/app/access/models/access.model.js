var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var accessSchema;
accessSchema = new Schema({


    userId: {type: Schema.ObjectId, ref: 'users', required: true },
    role: {type: String, required: true, enum: ['Team Member', 'Team Lead', 'Section Coordinator', 'Supervisor', 'Division Coordinator', 'Division Manager', 'Department Manager']},
    permissions: {
        departments: [
            {type: Schema.ObjectId, ref: 'departments'}
        ],
        divisions: [
            {type: Schema.ObjectId, ref: 'divisions' }
        ],
        sections: [
            {type: Schema.ObjectId, ref: 'sections'}
        ],
        teams: [
            {type: Schema.ObjectId, ref: 'teams'}
        ]},
    createdDate: {type: Date, default: Date.now}

}, {collection: 'Access'});

var Access=mongoose.model('Access', accessSchema);
module.exports = Access;