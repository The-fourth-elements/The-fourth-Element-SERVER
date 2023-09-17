const { Users } = require('../models/Users')
const {handleUserDB, handleAllUserDB }= require('../handler/handleUserDB')
const { createToken } = require('../services/token')

//obtener usuario por id

async function userGetController(req,res, next) {
    try {     
        const {id} = req.query
        if(!id) next({message: 'id is invalid', statusCode: 401})
        const user = await handleUserDB(Users,id)
      
        if(!user?.error){
            res.status(200).json(user);
        } else throw Error(user.error);
    } catch (error) {
        next(error)
    }
}

//obtener todos los usuarios
async function userGetAllController(req,res, next){
    try {     
        const user = await handleAllUserDB(Users);
        if(!user?.error){
            res.status(200).json(user);
        } else throw Error(user.error);
    } catch (error) {
        next(error)
    }
}

//registro de usuario

async function userCreateController (req,res, next){
    try {
        const user = req.body;
        const newUser = await Users.create(user);
        const token = createToken(String(newUser._id));
        res.cookie("jwt",token, {httpOnly: true });
        res.status(200).json({access:true,message:"User created"});
    } catch (error) {
        next({message: error.message, statusCode: 400})
    }
}

// logeo del usuario
async function userLoginController(req,res, next){
    try {
        const {email,password} = req.body;
        const user = await Users.login(email,password);
        if(!user?.error){
            const token =  createToken(String(user._id));
            res.cookie("jwt",token,{ httpOnly: true });
            res.status(200).json({ success: true, message: "Login successful" });        
        }
        else throw Error("The email or password is invalid")
    } catch (error) {
        next({message: error.message, statusCode: 404})
    }
}

module.exports = {
    userGetController,
    userCreateController,
    userLoginController,
    userGetAllController
}