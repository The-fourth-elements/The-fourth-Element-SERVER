const express = require('express');
const router = express.Router();
const createGoogleUser = require('../controllers/createGoogleUser.controller');
const {userCreateController,userGetController, userLoginController, userGetAllController, userDelete, userUpdate} = require('../controllers/userController');
const { requireAuthController, forgotPassword, authResetPassword, resetPassword } = require('../controllers/authController');

 
//crear y recibir informacion de un usuario.
router.post('/user', userCreateController);
router.post('/login', userLoginController);
router.get('/user', userGetController);
router.get('/users', userGetAllController);
router.put('/user', userUpdate);
router.delete('/user', userDelete);

router.get('/signin', createGoogleUser)

//validar información de usuario
router.post('/auth', requireAuthController);

//forgot-password
router.post('/auth/forgot', forgotPassword);
router.post('/reset-password', resetPassword);


module.exports = router;