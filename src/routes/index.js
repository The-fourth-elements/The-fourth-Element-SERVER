const express = require('express');
const router = express.Router();

const {userCreateController,userGetController, userLoginController, userGetAllController} = require('../controllers/userController');
const { requireAuthController, forgotPassword, authResetPassword, resetPassword } = require('../controllers/authController');
 
//crear y recibir informacion de un usuario.
router.post('/user', userCreateController);
router.post('/login', userLoginController);
router.get('/user', userGetController);
router.get('/users', userGetAllController);

//validar información de usuario
router.post('/auth',requireAuthController);

//forgot-password
router.post('/auth/forgot', forgotPassword);
router.post('/reset-password', resetPassword);


module.exports = router;