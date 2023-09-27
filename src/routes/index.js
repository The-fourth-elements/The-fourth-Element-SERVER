const express = require('express');
const router = express.Router();

// Probar
const { createUserWithBody, loginUser, getAllUsers, updateUser, deleteUser, getUserById, getAllUsersDeleted, getUserReset } = require('../controllers/controllUsers/index');
const { createController, updateController, deleteController, getAllModules, addClassToModule, getModuleById } = require('../controllers/modulsController');
const { createClass, addVideoToClass, addPowerPointToClass, getAllClasses, getClassById} = require('../controllers/classControllers/index');
const { createVideo, updateVideo, getAllVideos, getVideoById, deleteVideo} = require('../controllers/videoControllers/index')
const { updatePowerPoint, createPowerPoint, getAllPowerPoints, getPowerPointById, deletePowerPoint} = require('../controllers/powerPointControllers/index');
const getLandingContent = require('../controllers/landingContent/getLandingContent');
const createLandingContent = require('../controllers/landingContent/createLandingContent');

// Payment Gategway Imports
const createOrder = require('../controllers/paymentGateway/createOrder');
const feedback = require('../controllers/paymentGateway/feedback');
const reciveWebhook = require('../controllers/paymentGateway/reciveWebhook');

// Middleware Role Import
const verifyUserRole = require('../middlewares/verifyUserRole');
const { forgotPassword, resetPassword } = require('../controllers/authController');
const { getCityById, getAllCities } = require('../controllers/cityControllers/index');
const { getAllCountries, getCountryById } = require('../controllers/countryControllers/index');
const getUserByMail = require('../controllers/getUserByEmail');

//crear y recibir informacion de un usuario.
router.get('/users', getAllUsers);
router.get('/user', getUserById);
router.get('/user/email', getUserByMail);
router.put('/user', updateUser);
router.delete('/user/:id', deleteUser);

// Landing Content Testimonies
router.get('/content', getLandingContent); // Funciona
router.post('/content', createLandingContent); // Funciona
router.get('/users', getAllUsers);
router.get('/user', getUserById);
router.get('/user/email', getUserByMail);
router.put('/user', updateUser);
router.delete('/user/:id', deleteUser);

//validar información de usuario
router.post('/auth', createUserWithBody);
router.post('/login', loginUser);

// Landing Content Testimonies
router.get('/content', getLandingContent);
router.post('/content', createLandingContent);

// creacio, actualizacion y eliminacion de modulos
router.get('/moduls', getAllModules);
router.get('/moduls/:id', getModuleById);
router.post('/moduls', createController);
router.put('/moduls/:id', updateController);
router.delete('/moduls/:id', deleteController);
router.put('/module/:moduleId/class/:classId', addClassToModule);

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
router.delete('/video/:id', deleteVideo)

//crea power points
router.get('/powerpoints',getAllPowerPoints) //get all
router.get('/powerpoint/:id',getPowerPointById) // get by id
router.post('/powerpoint', createPowerPoint)
router.put('/powerpoint/:id', updatePowerPoint)
router.delete('/powerpoint/:id', deletePowerPoint)

//City
router.get('/cities', getAllCities);
router.get('/city/:id', getCityById);

//Country / Nation / Nationality
router.get('/countries', getAllCountries);
router.get('/country/:id', getCountryById);

//Pasarela de pagos
router.post('/create-order', createOrder) //Pasarela de pago
// router.post('/webhook', reciveWebhook); //Pasarela de pago
// router.get('/feedback', feedback); //Pasarela de pago
// router.get('/success', success); //Pasarela de pago
// router.get('/failure', failure); //Pasarela de pago

// Reseteo de contraseña
router.post('/auth/forgot', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
