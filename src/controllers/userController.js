const Users = require('../models/Users')
const {handleUserDB, handleAllUserDB }= require('../handler/handleUserDB')
const { createToken } = require('../services/token')



//obtener usuario por id

async function userGetController(req,res) {
    try {     
        const {id} = req.query
        if(!id) throw Error('id is invalid')
        const user = await handleUserDB(Users,id)
        if(!user?.error){
            res.status(200).json(user)
        } else throw Error(user.error)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


//obtener todos los usuarios
async function userGetAllController(req,res){
    try {     
        const user = await handleAllUserDB(Users)
        if(!user?.error){
            res.status(200).json(user)
        } else throw Error(user.error)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


//registro de usuario

async function userCreateController (req,res){
    try {
        const user = req.body;
        const newUser = await Users.create(user)
        const token = await createToken(String(newUser._id))
        res.cookie("jwt",token, {httpOnly: true })
        res.status(200).json({access:true,message:"User created"})
    } catch (error) {
        res.status(400).json(error.message)
    }
}


// logeo del usuario
async function userLoginController(req,res){
    try {
        const {email,password} = req.body
        const user = await Users.login(email,password)
        if(!user?.error){
            
           
            const token =  createToken(String(user._id))
            res.cookie("jwt",token,{ httpOnly: true })
            res.status(200).json({ success: true, message: "Login successful" });        
        }
        else
        throw Error(response.error)
    } catch (error) {
        res.status(404).json({"error": error.message})
    }
}



module.exports = {
    userGetController,
    userCreateController,
    userLoginController,
    userGetAllController
}