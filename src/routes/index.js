const express = require('express');
const router = express.Router();

const { getOneLandingContent, createLandingContent, deleteLandingContent, uppdateLandingContent, getAllLandingContent } = require('../controllers/landingContent');
const { createUserWithBody, loginUser, getAllUsers, updateUser, deleteUser, getUserById, getAllUsersDeleted, getUserReset, getUserByEmail } = require('../controllers/controllUsers/index');
const { createController, updateController, deleteController, getAllModules, addClassToModule, getModuleById } = require('../controllers/modulsController');
const { createClass, addVideoToClass, addPowerPointToClass, getAllClasses, getClassById, deleteClass, updateClass } = require('../controllers/classControllers/index');
const { createVideo, updateVideo, getAllVideos, getVideoById, deleteVideo } = require('../controllers/videoControllers/index')
const { updatePowerPoint, createPowerPoint, getAllPowerPoints, getPowerPointById, deletePowerPoint } = require('../controllers/powerPointControllers/index');
const { forgotPassword, resetPassword } = require('../controllers/authController');
const { getCityById, getAllCities, getCityByName } = require('../controllers/cityControllers/index');
const { getAllCountries, getCountryById, getCountryByName } = require('../controllers/countryControllers/index');
const { getAllSports, getSportById, getSportByName } = require('../controllers/sportControllers/index');

// Payment Gategway Imports
const createOrder = require('../controllers/paymentGateway/createOrder');
const feedback = require('../controllers/paymentGateway/feedback');
const inviteUser = require('../controllers/controllUsers/inviteUser');
// const reciveWebhook = require('../controllers/paymentGateway/reciveWebhook');

// Usuarios
router.get('/users/deleted', getAllUsersDeleted);
router.get('/user/reset', getUserReset);
router.get('/users', getAllUsers);
router.get('/user', getUserById);
router.get('/user/email', getUserByEmail);
router.put('/user', updateUser);
router.delete('/user/:id', deleteUser);

// Invitado
router.post('/invite', inviteUser)

// Testimonios de Landing Content 
router.delete('/content/:id', deleteLandingContent);
router.put('/content/:id', uppdateLandingContent);
router.get('/content/:id', getOneLandingContent);
router.post('/content', createLandingContent);
router.get('/content', getAllLandingContent);

// Validaciones y Registro
router.post('/auth', createUserWithBody);
router.post('/login', loginUser);

// Modulos
router.get('/moduls', getAllModules);
router.get('/moduls/:id', getModuleById);
router.post('/moduls', createController);
router.put('/moduls/:id', updateController);
router.delete('/moduls/:id', deleteController);
router.put('/module/:moduleId/class/:classId', addClassToModule);

// Clases
router.get('/class', getAllClasses);
router.get('/class/:id', getClassById);
router.post('/class', createClass);
router.put('/class/:classId/video/:videoId', addVideoToClass);
router.put('/class/:classId/powerpoint/:powerPointId', addPowerPointToClass);
router.delete('/class/:id', deleteClass);
router.put('/class/:id', updateClass);

// Videos
router.get('/videos', getAllVideos);
router.get('/video/:id', getVideoById);
router.post('/video', createVideo);
router.put('/video/:id', updateVideo);
router.delete('/video/:id', deleteVideo);

// Power Points
router.get('/powerpoints',getAllPowerPoints);
router.get('/powerpoint/:id',getPowerPointById);
router.post('/powerpoint', createPowerPoint);
router.put('/powerpoint/:id', updatePowerPoint);
router.delete('/powerpoint/:id', deletePowerPoint);

// Ciudad
router.get('/cities', getAllCities);
router.get('/city/:id', getCityById);
router.get('/city', getCityByName);

// Pais
router.get('/countries', getAllCountries);
router.get('/country/:id', getCountryById);
router.get('/country', getCountryByName);

// Deportes
router.get('/sports', getAllSports);
router.get('/sport/:id', getSportById);
router.get('/sport', getSportByName);

// Pasarela de pagos
router.post('/create-order', createOrder);
router.get('/feedback', feedback);
// router.post('/webhook', reciveWebhook);

// Reseteo de contraseña
router.post('/auth/forgot', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
