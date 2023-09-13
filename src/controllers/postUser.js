const Users = require('../models/Users');

const postUser = (req, res) => {
    try {
        const data = req.body;

        const createUser = Users.create(data);
        
        return res.status(201).json(createUser);
        
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = postUser;