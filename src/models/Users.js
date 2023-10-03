const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const { isEmail, isURL, isAscii } = require('validator');
const { compare } = require('../services/crypt');
const regexPass = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
const regexNumber = /^\d+$/;

const UserSchemas = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        validate: [isAscii, 'Last name must be a string']
    },
    name:{
        type: String,
        validate: [isAscii, 'Last name must be a string']
    },
    lastname:{
        type: String,
        validate: [isAscii, 'Last name must be a string']
    },
    adress:{
        type: String,
        validate: [isAscii, 'Address must be a string']
    },
    expYearsSports:{
        type: Number
    },
    age:{
        type: Number
    },
    city:{
        type: mongoose.Types.ObjectId
    },
    nation:{
        type: mongoose.Types.ObjectId
    },
    sport:{
        type: mongoose.Types.ObjectId
    },
    role:{
        type: Number,
        require: true,
        validate: {
            validator: function(value){
                return regexNumber.test(value)
            },
            message: 'Role must be a number'
        }
    },
    progress:{
        type: mongoose.Types.ObjectId,
        ref: "Progress"
    },
    profile_img:{
        public_id: String,
        secure_url: {
            type: String,
            validate: [isURL, 'Please enter an URL valid']
        }
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'Please enter an email'],
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter an password'],
        validate: {
            validator: function(value){
                return regexPass.test(value);
            },
            message: 'Please enter a minimun six characters, one number and one capital letter'
        }
    }
},
{
    timestamps: true
});

UserSchemas.statics.login = async function(email, password){
    try {
        const user = await this.findOne({email});
        
        if(user){
            const auth = await compare(password, user.password);
            if(auth){
                return user;
            } else throw Error('Incorrect Password');
        } else throw Error('Invalid Email');
    } catch (error) {
        return {error: error.message};
    }
}

UserSchemas.plugin(mongooseDelete, { overrideMethods: 'all'});
const Users = mongoose.model("Users", UserSchemas);

module.exports = {
    Users,
    regexPass,
    regexNumber
};
