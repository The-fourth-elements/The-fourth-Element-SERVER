const { Users } = require('../models/Users')
const { handleUserDB, handleAllUserDB }= require('../handler/handleUserDB')
const { createToken } = require('../services/token')
const findOrCreateCity = require('../handler/findOrCreateCity');
const { encrypt } = require('../services/crypt');
const findOrCreateNationality = require('../handler/findOrCreateNationality')

//obtener usuario por id
async function userGetController(req,res, next) {
    try {     
        const { id } = req.query
        if(!id) next({message: 'id is invalid', statusCode: 401});
        const user = await handleUserDB(Users,id);
        if(!user?.error){
            res.status(200).json(user);
        } else throw Error(user.error);
    } catch (error) {
        next(error);
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
        const city = await findOrCreateCity(user.city)
        const nationality = await findOrCreateNationality(user.nationality)
        if(!city && !nationality) throw Error("City or Nationality can't be created or found");
        const password = await encrypt(user.password);
        
        const newUser = await Users.create({...user, city: city._id, password: password, nationality: nationality._id});
        const token = createToken(String(newUser._id));
        res.cookie("jwt",token, {httpOnly: true });
        res.status(200).json({ access:true, message:"User created" });
    } catch (error) {
        next({message: error.message, statusCode: 400})
    }
}

// logeo del usuario
async function userLoginController(req,res, next){
    try {
        const { email, password } = req.body;
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

async function userUpdate(req, res, next){
    try {
        const { id } = req.body;
        const body = req;
        const data = await Users.findOneAndUpdate(id, body);
        if(data) res.status(200).json(data);
        throw Error('An error occurred while updating');
    } catch (error) {
        next({message: error.message, statusCode: 404})
    }
}

async function userDelete(req, res, next){
    try {
        const { id } = req.body;
        const data = await Users.delete({_id:id});
        if(data) return res.status(204).send('User delete');
        throw Error('User not found');
    } catch (error) {
        next({message: error.message, statusCode: 400});
    }
}

module.exports = {
    userGetController,
    userCreateController,
    userLoginController,
    userGetAllController,
    userUpdate,
    userDelete
}
