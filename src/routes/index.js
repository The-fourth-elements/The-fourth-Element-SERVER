const express = require('express');
const router = express.Router();

const {userCreateController,userGetController, userLoginController, userGetAllController} = require('../controllers/userController')
const {requireAuthController} = require('../controllers/authController')
//crear y recibir informacion de un usuario.
router.post('/user', userCreateController);
router.post('/login', userLoginController)
router.get('/user',  userGetController);
router.get('/users',userGetAllController)

//validar información de usuario
router.post('/auth',requireAuthController)

// router.get('ruta', funcion);  
// router.get('ruta', funcion);
// router.post('ruta', funcion);


module.exports = router;