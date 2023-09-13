const mongoose = require('mongoose');

const RoleMongoose = new mongoose.Schemas({
    permission:{
        type: Number
    }
})

module.exports = mongoose.model("Role", RoleMongoose);