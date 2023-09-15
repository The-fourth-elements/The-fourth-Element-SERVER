const mongoose = require('mongoose');
const {Schema} = mongoose
const RoleMongoose = new mongoose.Schema({
    permission:{
        type: Number
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
})

const Role = mongoose.model("Role", RoleMongoose);
module.exports = Role;