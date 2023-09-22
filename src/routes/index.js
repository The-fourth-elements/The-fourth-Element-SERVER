const express = require('express');
const router = express.Router();
const createGoogleUser = require('../controllers/Verify Users/createGoogleUserController');
const createUserWithEmailAndPassword = require('../controllers/Verify Users/createUserWithEmailAndPasswordController')
const { userGetController, userGetAllController, userDeleteController, userUpdateController, updateContentController} = require('../controllers/userController');
// const { forgotPassword, resetPassword } = require('../controllers/authController');
const verifyUserRole = require('../middlewares/verifyUserRole');
 
//crear y recibir informacion de un usuario.
router.get('/users', verifyUserRole, userGetAllController);
router.get('/user', userGetController);
router.put('/user', userUpdateController);
router.delete('/user/:id', userDeleteController);

// Landing Content Testimonies
router.post('/content', updateContentController);

//validar información de usuario
router.get('/signin', createGoogleUser); //Modificar Ruta
router.post('/auth', createUserWithEmailAndPassword)

// Faltan
// router.post('/create', nada); //Crea y modifica el clase de cada módulo
// router.post('/create', nada); //Crea y modifica el módulo
// router.get('/create', nada); //Pasarela de pago
// router.post('/create', nada); //Pasarela de pago



//forgot-password
// router.post('/auth/forgot', forgotPassword);
// router.post('/reset-password', resetPassword);

module.exports = router;
