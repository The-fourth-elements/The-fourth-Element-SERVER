const mongoose = require('mongoose');

const RoleMongoose = new mongoose.Schema({
    permission:{
        type: Number
    }
})

const Role = mongoose.model("Role", RoleMongoose);
module.exports = Role;