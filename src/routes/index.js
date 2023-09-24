const express = require('express');
const router = express.Router();
// const { forgotPassword, resetPassword } = require('../controllers/authController');

// Controll Users Imports
const getUserById = require('../controllers/ControllUsers/getUserById');
const getAllUsers = require('../controllers/controllUsers/getAllUsers');
const updateUser = require('../controllers/controllUsers/updateUser');
const deleteUser = require('../controllers/controllUsers/deleteUser');

// Create User Imports
const createUserWithBody = require('../controllers/createUsers/createUserWithBody');
const loginUser = require('../controllers/userController')

const createGoogleUser = require('../controllers/createUsers/createUserWithGoogle');

// Create Content Import
const createContent = require('../controllers/createContent');

// Payment Gategway Imports
const createOrder = require('../controllers/paymentGateway/createOrder');
const feedback = require('../controllers/paymentGateway/feedback');
const reciveWebhook = require('../controllers/paymentGateway/reciveWebhook');

// Middleware Role Import
const verifyUserRole = require('../middlewares/verifyUserRole');

//crear y recibir informacion de un usuario.
router.get('/users', getAllUsers);
router.get('/user', getUserById);
router.put('/user', updateUser);
router.delete('/user/:id', deleteUser);

// Landing Content Testimonies
router.post('/content', createContent);

//validar información de usuario
router.get('/signin', createGoogleUser); //Modificar Ruta
router.post('/auth', createUserWithBody);
router.post('/login', loginUser)

// Faltan
// router.post('/create', nada); //Crea y modifica el clase de cada módulo
// router.post('/create', nada); //Crea y modifica el módulo

//Pasarela de pagos
// router.post('/create-order', createOrder) //Pasarela de pago
// router.post('/webhook', reciveWebhook); //Pasarela de pago
// router.get('/feedback', feedback); //Pasarela de pago
// router.get('/success', success); //Pasarela de pago
// router.get('/failure', failure); //Pasarela de pago

// Revisar con Edu
// router.post('/auth/forgot', forgotPassword);
// router.post('/reset-password', resetPassword);

module.exports = router;
