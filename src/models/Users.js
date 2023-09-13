const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchemas = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    lastName:{
        type: String
    },
    adress:{
        type: String
    },
    city:{
        type: Number
    },
    natinality:{
        type: Number
    },
    module:{
        type: Array
    },
    role:{
        type: Number
    },
    progress:{
        type: Number
    },
    status:{
        type: Boolean
    },
    profile_img:{
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String
    }
});

UserSchemas.pre("save", async function(next){
const salt = await bcrypt.genSalt();
console.log(this.password)

this.password = await bcrypt.hash(this.password,salt)
console.log(this.password)
next();
})


const Users = mongoose.model("Users", UserSchemas);

module.exports = Users;