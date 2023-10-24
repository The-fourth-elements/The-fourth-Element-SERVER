const mongoose = require('mongoose');

const AboutMongoose = new mongoose.Schema({
    title: {
        type: String,
    },
    content: { 
        type: String 
    }
});

const About = mongoose.model("About", AboutMongoose);
module.exports = About