const mongoose = require('mongoose');
const {isEmail, isURL, isAlpha } = require('validator');
const { encrypt, compare } = require('../services/crypt');
const regexPass = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
const regexNumber = /^\d+$/;

const UserSchemas = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        validate: [isAlpha, 'Name must be a string']
    },
    lastName:{
        type: String,
        validate: [isAlpha, 'Last name must be a string']
    },
    adress:{
        type: String,
        validate: [isAlpha, 'Address must be a string']
    },
    city:{
        type: mongoose.Types.ObjectId,
        // validate: [isMongoId, 'City must be a ObjectId']
    },
    nationality:{
        type: mongoose.Types.ObjectId,
        // validate: [isMongoId, 'Nationality must be a ObjectId']
    },
    module:{
        type: Array
    },
    role:{
        type: Number,
        validate: {
            validator: function(value){
                return regexNumber.test(value)
            },
            message: 'Role must be a number'
        }
    },
    progress:{
        type: Number,
        validate: {
            validator: function(value){
                return regexNumber.test(value)
            },
            message: 'Progress must be a number'
        }
    },
    status:{
        type: Boolean,
    },
    profile_img:{
        type: String,
        validate: [isURL, 'Profile image must be a valid URL']
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
});

UserSchemas.pre("save", async function(next){
    this.password = encrypt(this.password)
    next();
})

UserSchemas.statics.login = async function(email,password){
    try {
        const user = await this.findOne({email})
        if(user){
          const auth = await compare(password,user.password);
          if(auth){
            return user;
          } 
          throw Error('password incorrect');
        }
        throw Error('email is invalid');
    } catch (error) {
        return {"error": error.message};
    }
}

const Users = mongoose.model("Users", UserSchemas);

module.exports = {
    Users,
    regexPass,
    regexNumber
};
