const express = require('express');
const router = express.Router();
// const { forgotPassword, resetPassword } = require('../controllers/authController');

// Controll Users Imports
const getUserById = require('../controllers/ControllUsers/getUserById');
const getAllUsers = require('../controllers/controllUsers/getAllUsers');
const updateUser = require('../controllers/controllUsers/updateUser');
const deleteUser = require('../controllers/controllUsers/deleteUser');
const { createController, uppdateController, deleteController } = require('../controllers/modulsController');
// Create User Imports
const createUserWithBody = require('../controllers/createUsers/createUserWithBody');
const createGoogleUser = require('../controllers/createUsers/createUserWithGoogle');

// Create Content Import
const landingContent = require('../controllers/landingContent');

// Middleware Role Import
const verifyUserRole = require('../middlewares/verifyUserRole');
 
//crear y recibir informacion de un usuario.
router.get('/users', verifyUserRole, getAllUsers);
router.get('/user', getUserById);
router.put('/user', updateUser);
router.delete('/user/:id', deleteUser);

// Landing Content Testimonies
router.post('/content', landingContent);

//validar información de usuario
router.get('/signin', createGoogleUser); //Modificar Ruta
router.post('/auth', createUserWithBody);

// creacio, actualizacion y eliminacion de modulos
router.post('/moduls', createController);
router.put('/moduls/:id', uppdateController);
router.delete('/moduls/:id', deleteController);
// router.get('/create', nada); //Pasarela de pago
// router.post('/create', nada); //Pasarela de pago

// Revisar con Edu
// router.post('/auth/forgot', forgotPassword);
// router.post('/reset-password', resetPassword);

module.exports = router;
