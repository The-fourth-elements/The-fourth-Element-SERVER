const express = require('express');
const router = express.Router();
const createGoogleUser = require('../controllers/createGoogleUser.controller');
const createUserWithEmailAndPassword = require('../controllers/createUserWithEmailAndPassword.controller')
const { userCreateController, userGetController, userLoginController, userGetAllController, userDeleteController, userUpdateController, updateContentController} = require('../controllers/userController');
const { requireAuthController, forgotPassword, resetPassword } = require('../controllers/authController');
const verifyUserRole = require('../middlewares/verifyUserRole');
 
//crear y recibir informacion de un usuario.
router.get('/users', verifyUserRole, userGetAllController);
router.get('/user', userGetController);
router.put('/user', userUpdateController);
router.post('/user', userCreateController);
router.post('/register', createUserWithEmailAndPassword)
router.delete('/user/:id', userDeleteController);
router.post('/content', updateContentController);

//validar información de usuario
router.get('/signin', createGoogleUser);
router.post('/login', userLoginController);
router.post('/auth', requireAuthController);

//forgot-password
router.post('/auth/forgot', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;