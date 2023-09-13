const Users = require('../models/Users');

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find({});
        if (users) return res.status(200).json(users);
        
    } catch (error) {
        return res.status(400).json({ error: error.message});
    }
}

module.exports = getAllUsers;