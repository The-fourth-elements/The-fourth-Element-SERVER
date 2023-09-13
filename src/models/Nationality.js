const mongoose = require('mongoose');
const { Schema } = mongoose;

const NationalityMongoose = new mongoose.Schema({
    name:{
        type: String
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
})

const Nationality = mongoose.model("Nationality", NationalityMongoose);
module.exports = Nationality;