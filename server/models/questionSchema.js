const mongoose = require ("mongoose");
const { Schema } = mongoose;

/** question model */
const questionModel = new Schema({
    questions: { type : Array, default: []}, // create question with [] default value
    answers : { type : Array, default: []},
    uniqueId: { 
        type: String,
        minLength: [6, "Id must include atleast 6 digits "],
        maxLength: [6, "Id can not include more than 6 digits"],
        unique: [true, "Id already taken by someone"],
     },
     email: {type: String, default: ""},
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Question', questionModel);