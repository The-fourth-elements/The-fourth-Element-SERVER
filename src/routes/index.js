const express = require('express');
const router = express.Router();
const createGoogleUser = require('../controllers/createGoogleUser.controller');
const {userCreateController,userGetController, userLoginController, userGetAllController, userDelete, userUpdate} = require('../controllers/userController');
const { requireAuthController, forgotPassword, resetPassword } = require('../controllers/authController');
 
//crear y recibir informacion de un usuario.
router.get('/users', userGetAllController);
router.get('/user', userGetController);
router.put('/user', userUpdate);
router.post('/user', userCreateController);
router.delete('/user/:id', userDelete);

//validar información de usuario
router.get('/signin', createGoogleUser);
router.post('/login', userLoginController);
router.post('/auth', requireAuthController);

//forgot-password
router.post('/auth/forgot', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;