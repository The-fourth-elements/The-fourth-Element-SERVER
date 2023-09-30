const mongoose = require('mongoose');
const {isAscii} = require('validator');

const ClassMongoose = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor ingrese un nombre.'],
        validate: [isAscii, 'El nombre debe ser un ASCII valido.']
    },
    description: {
        type: String,
        required: [true, 'Por favor ingrese un nombre.'],
        validate: [isAscii, 'La descripción debe ser un ASCII valido.']
    },
    video: {
        type: mongoose.Types.ObjectId,
        ref: "Video"
    },
    powerPoint:{
        type: mongoose.Types.ObjectId,
        ref: "PowerPoint"
    }
});

const Class = mongoose.model("Class", ClassMongoose);
module.exports = Class;