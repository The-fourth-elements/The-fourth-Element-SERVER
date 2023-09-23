const { Users } = require("../../models/Users");

async function updateUser(req, res, next){
    try {
        const { id } = req.body;
        const { body } = req;
        const updateUser = await Users.findByIdAndUpdate(id, body, {new: true});
        if (updateUser) res.status(200).json(updateUser);
        else throw Error('An error occurred while updating');
    } catch (error) {
        next({message: error.message, statusCode: 404})
    }
}

module.exports = updateUser;