const express = require('express');
const router = express.Router();
// const { forgotPassword, resetPassword } = require('../controllers/authController');

// Controll Users Imports
//const getUserById = require('../controllers/ControllUsers/getUserById');
const getAllUsers = require('../controllers/controllUsers/getAllUsers');
const updateUser = require('../controllers/controllUsers/updateUser');
const deleteUser = require('../controllers/controllUsers/deleteUser');
const { createController, uppdateController, deleteController } = require('../controllers/modulsController');
// Create User Imports
const createUserWithBody = require('../controllers/createUsers/createUserWithBody');
const loginUser = require('../controllers/userController')

const createGoogleUser = require('../controllers/createUsers/createUserWithGoogle');

const { createClass, addVideoToClass, addPowerPointToClass, getAllClasses, getClassById} = require('../controllers/classControllers/index')
const { createVideo, updateVideo, getAllVideos, getVideoById} = require('../controllers/videoControllers/index')
const { updatePowerPoint, createPowerPoint, getAllPowerPoints, getPowerPointById} = require('../controllers/powerPointControllers/index');

// Create Landing content Import
const landingContent = require('../controllers/landingContent');

// Payment Gategway Imports
const createOrder = require('../controllers/paymentGateway/createOrder');
const feedback = require('../controllers/paymentGateway/feedback');
const reciveWebhook = require('../controllers/paymentGateway/reciveWebhook');

// Middleware Role Import
const verifyUserRole = require('../middlewares/verifyUserRole');

//crear y recibir informacion de un usuario.
router.get('/users', verifyUserRole, getAllUsers);
//router.get('/user', getUserById); 
router.get('/user', getUserById);
router.put('/user', updateUser);
router.delete('/user/:id', deleteUser);

// Landing Content Testimonies
router.post('/content', landingContent);

//validar información de usuario
router.get('/signin', createGoogleUser); //Modificar Ruta
router.post('/auth', createUserWithBody);
router.post('/login', loginUser)

// creacio, actualizacion y eliminacion de modulos
router.post('/moduls', createController);
router.put('/moduls/:id', uppdateController);
router.delete('/moduls/:id', deleteController);

// router.post('/create', nada); //Crea y modifica el clase de cada módulo
router.get('/class', getAllClasses) // busca todas las classes
router.get('/class/:id', getClassById) //busca por id
router.post('/class', createClass) //crea la clase
router.put('/class/:classId/video/:videoId', addVideoToClass) //agrega el video a la clase
router.put('/class/:classId/powerpoint/:powerPointId', addPowerPointToClass) //agrega el powerpoint a la clase
//crea Videos
router.get('/videos', getAllVideos) //get all
router.get('/video/:id', getVideoById) //get by id
router.post('/video', createVideo)
router.put('/video/:id', updateVideo)
//crea power points
router.get('/powerpoints',getAllPowerPoints) //get all
router.get('/powerpoint/:id',getPowerPointById) // get by id
router.post('/powerpoint', createPowerPoint)
router.put('/powerpoint/:id', updatePowerPoint)


//Pasarela de pagos
router.post('/create-order', createOrder) //Pasarela de pago
// router.post('/webhook', reciveWebhook); //Pasarela de pago
// router.get('/feedback', feedback); //Pasarela de pago
// router.get('/success', success); //Pasarela de pago
// router.get('/failure', failure); //Pasarela de pago

// Revisar con Edu
// router.post('/auth/forgot', forgotPassword);
// router.post('/reset-password', resetPassword);

module.exports = router;
