const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const { isEmail, isURL } = require('validator');
const { compare } = require('../services/crypt');
const regexPass = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
const regexStrings = /^[A-Za-z0-9áéíóúÁÉÍÓÚüÜñÑ.,¿?¡! ]+$/u;
const regexNumber = /^\d+$/;

const UserSchemas = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        validate: {
            validator: function (value) {
                return regexStrings.test(value)
            },
            message: 'Solo se permiten numeros, letras'
        }
    },
    providerId: {
        type: String
    },
    name: {
        type: String,
        validate: {
            validator: function (value) {
                return regexSport.test(value)
            },
            message: 'Solo se permiten numeros, letras'
        }
    },
    lastname: {
        type: String,
        validate: {
            validator: function (value) {
                return regexSport.test(value)
            },
            message: 'Solo se permiten numeros, letras'
        }
    },
    adress: {
        type: String,
        validate: {
            validator: function (value) {
                return regexStrings.test(value)
            },
            message: 'Solo se permiten numeros, letras'
        }
    },
    city: {
        type: mongoose.Types.ObjectId,
        ref: "City",
    },
    nation: {
        type: mongoose.Types.ObjectId,
        ref: "Nation",
    },
    sport: {
        type: mongoose.Types.ObjectId,
        ref: "Sport",
    },
    age: {
        type: Number
    },
    expYearsSports: {
        type: Number
    },
    role: {
        type: Number,
        require: true,
        validate: {
            validator: function (value) {
                return regexNumber.test(value)
            },
            message: 'Role must be a number'
        }
    },
    profile_img: {
        public_id: {
            type: String
        },
        secure_url: {
            type: String,
            validate: [isURL, 'Please enter an URL valid']
        }
    },
    progress: {
        type: mongoose.Types.ObjectId,
        ref: "Progress"
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter an email'],
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        validate: {
            validator: function (value) {
                return regexPass.test(value);
            },
            message: 'Please enter a minimun six characters, one number and one capital letter'
        }
    },
    stripe_payment: { 
        type: String 
    },
    responses: {
        type: Array
    }
},
    {
        timestamps: true
    });

UserSchemas.statics.login = async function (email, password) {
    try {
        const user = await this.findOne({ email });

        if (user) {
            const auth = await compare(password, user.password);
            if (auth) {
                return user;
            } else throw Error('Incorrect Password');
        } else throw Error('Invalid Email');
    } catch (error) {
        return { error: error.message };
    }
}

UserSchemas.plugin(mongooseDelete, { overrideMethods: 'all' });
const Users = mongoose.model("Users", UserSchemas);

module.exports = {
    Users,
    regexPass,
    regexNumber,
    regexStrings
};
