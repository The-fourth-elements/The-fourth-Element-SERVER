const express = require('express');
const router = express.Router();

const {userCreateController,userGetController, userLoginController, userGetAllController} = require('../controllers/userController');
const { requireAuthController } = require('../controllers/authController');
const createGoogleUser = require('../controllers/createGoogleUser.controller');
 
//crear y recibir informacion de un usuario.
router.post('/user', userCreateController);
router.post('/login', userLoginController)
router.get('/user', userGetController);
router.get('/users', userGetAllController)

router.get('/signin', createGoogleUser)

//validar información de usuario
router.post('/auth',requireAuthController)

// router.get('ruta', funcion);  
// router.get('ruta', funcion);
// router.post('ruta', funcion);

module.exports = router;