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
    this.password = await bcrypt.hash(this.password,salt)
    next();
})

UserSchemas.statics.login = async function(email,password){
    try {
        const user = await this.findOne({email})
        if(user){
          const auth = await bcrypt.compare(password,user.password)
          if(auth){
            return user;
          } 
          throw Error('password incorrect')
        }
        throw Error('email is invalid')
    } catch (error) {
        return {"error": error.message}
    }
}

const Users = mongoose.model("Users", UserSchemas);

module.exports = Users;