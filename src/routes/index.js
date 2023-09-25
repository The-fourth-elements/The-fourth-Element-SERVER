const express = require('express');
const router = express.Router();
// const { forgotPassword, resetPassword } = require('../controllers/authController');

// Probar
const { getAllUsers, updateUser, deleteUser, getUserById } = require('../controllers/controllUsers/index');
const { createController, updateController, deleteController, getAllModules, addClassToModule, getModuleById } = require('../controllers/modulsController');
const { createClass, addVideoToClass, addPowerPointToClass, getAllClasses, getClassById} = require('../controllers/classControllers/index');

// Create User Imports
const createUserWithBody = require('../controllers/createUsers/createUserWithBody');
const createGoogleUser = require('../controllers/createUsers/createUserWithGoogle');
const loginUser = require('../controllers/userController')


const { createVideo, updateVideo, getAllVideos, getVideoById} = require('../controllers/videoControllers/index')
const { updatePowerPoint, createPowerPoint, getAllPowerPoints, getPowerPointById} = require('../controllers/powerPointControllers/index');

// Landing content Import
const getLandingContent = require('../controllers/landingContent/getLandingContent');
const createLandingContent = require('../controllers/landingContent/createlandingContent');


// Payment Gategway Imports
const createOrder = require('../controllers/paymentGateway/createOrder');
const feedback = require('../controllers/paymentGateway/feedback');
const reciveWebhook = require('../controllers/paymentGateway/reciveWebhook');

// Middleware Role Import
const verifyUserRole = require('../middlewares/verifyUserRole');

//crear y recibir informacion de un usuario.
router.get('/users', getAllUsers); // Funciona
router.get('/user', getUserById); // Funciona
router.put('/user', updateUser); // Funciona, reveer el delete
router.delete('/user/:id', deleteUser); // Funciona

// Landing Content Testimonies
router.get('/content', getLandingContent); // Funciona
router.post('/content', createLandingContent); // Funciona

//validar información de usuario
router.get('/signin', createGoogleUser); //Modificar Ruta
router.post('/auth', createUserWithBody); // Funciona
router.post('/login', loginUser); // Funciona

// creacio, actualizacion y eliminacion de modulos
router.get('/moduls', getAllModules); //
router.get('/moduls/:id', getModuleById); //
router.post('/moduls', createController); // Funciona
router.put('/moduls/:id', updateController); // Funciona
router.delete('/moduls/:id', deleteController); // Funciona
router.put('/module/:moduleId/class/:classId', addClassToModule); //

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
