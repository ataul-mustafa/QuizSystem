const mongoose = require ("mongoose");
const { Schema } = mongoose;


/** result model */
const resultModel = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
    },
    uniqueId: { type: String,},
    username: {type: String, default: ''},
    userEmail: {type: String, default: ''},
    result : { type: Array, default: [] },
    attempts : { type: Number, default: 0 },
    points : { type: Number, default: 0 },
    achived : { type: String, default: '' },
    createdAt : { type: Date, default: Date.now }
})

module.exports = mongoose.model('result', resultModel);