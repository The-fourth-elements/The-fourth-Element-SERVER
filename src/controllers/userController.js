


function userGetController(req,res) {



}


const Users = require('../models/Users')

async function userCreateController (req,res){

    try {
        const user = req.body;
        const newUser = await Users.create(user)
        res.status(200).json(newUser)
    } catch (error) {
        res.status(400).json(error.message)
    }
}




module.exports = {
    userGetController,
    userCreateController
}