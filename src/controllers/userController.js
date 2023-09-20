const { Users } = require('../models/Users')
const { handleUserDB, handleAllUserDB }= require('../handler/handleUserDB')
const { createToken } = require('../services/token')
const findOrCreateCity = require('../handler/findOrCreateCity');
const { encrypt } = require('../services/crypt');
const findOrCreateNationality = require('../handler/findOrCreateNationality')
const Content = require('../models/Content');

//obtener usuario por id
async function userGetController(req, res, next) {
    try {     
        const { id } = req.query
        if (!id) next({message: 'id is invalid', statusCode: 401});
        const user = await handleUserDB(id);
        if (!user?.error){
            res.status(200).json(user);
        } else throw Error(user.error);
    } catch (error) {
        next(error);
    }
}

//obtener todos los usuarios
async function userGetAllController(req, res, next){
    try {     
        const user = await handleAllUserDB();
        if (!user?.error){
            res.status(200).json(user);
        } else throw Error(user.error);
    } catch (error) {
        next(error)
    }
}

//registro de usuario
async function userCreateController (req, res, next){
    try {
        const user = req.body;
        const city = await findOrCreateCity(user.city)
        const nationality = await findOrCreateNationality(user.nationality)
        const password = await encrypt(user.password);

        if (!city && !nationality) throw Error("City or Nationality can't be created or found");
        const newUser = await Users.create({...user, city: city._id, password: password, nationality: nationality._id});
        if (newUser){
            const token = createToken(String(newUser._id));
            res.cookie("jwt",token, {httpOnly: true });
            res.status(200).json({ access:true, message: "User created"});
        } else throw Error('Could not create user.')
    } catch (error) {
        next({message: error.message, statusCode: 400})
    }
}

// logeo del usuario
async function userLoginController(req, res, next){
    try {
        const { email, password } = req.body;
        const user = await Users.login(email,password);
        if (!user?.error){
            const token =  createToken(String(user._id));
            res.cookie("jwt",token,{ httpOnly: true });
            res.status(200).json({ success: true, message: "Login successful" });        
        }
        else throw Error("The email or password is invalid")
    } catch (error) {
        next({message: error.message, statusCode: 404})
    }
}

async function userUpdateController(req, res, next){
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

async function userDeleteController(req, res, next){
    try {
        const { id } = req.params;
        const foundUser = await handleUserDB(id);
        if (foundUser.email) {
            const deleteUser = await Users.delete({_id: id});
            if (deleteUser) return res.status(200).json({message: `${foundUser.name} successful deleted.`});
        } else throw Error('User not found');
    } catch (error) {
        next({message: error.message, statusCode: 400});
    }
}

async function updateContentController(req, res, next){
    try {
        const { body } = req;
        console.log(body)
        if (!body) throw Error('Missing things');
        const newContent = await Content.create(body);
        if (newContent) return res.status(201).json(newContent);
        throw Error ('Error creating content');
    } catch (error) {
        next({message: error.message, statusCode: 404});
    }
}

module.exports = {
    userGetController,
    userCreateController,
    userLoginController,
    userGetAllController,
    userUpdateController,
    userDeleteController,
    updateContentController
}
