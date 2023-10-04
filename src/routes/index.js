const express = require('express');
const router = express.Router();

const { getOneLandingContent, createLandingContent, deleteLandingContent, uppdateLandingContent, getAllLandingContent } = require('../controllers/landingContent');
const { createUserWithBody, loginUser, getAllUsers, updateUser, deleteUser, getUserById, getAllUsersDeleted, getUserReset, getUserByEmail, getAllUsersAge, getUsersAge } = require('../controllers/controllUsers/index');
const { createController, updateController, deleteController, getAllModules, addClassToModule, getModuleById } = require('../controllers/modulsController');
const { createClass, addVideoToClass, addPowerPointToClass, getAllClasses, getClassById, deleteClass, updateClass } = require('../controllers/classControllers/index');
const { createVideo, updateVideo, getAllVideos, getVideoById, deleteVideo } = require('../controllers/videoControllers/index')
const { updatePowerPoint, createPowerPoint, getAllPowerPoints, getPowerPointById, deletePowerPoint } = require('../controllers/powerPointControllers/index');
const { forgotPassword, resetPassword } = require('../controllers/authController');
const { getCityById, getAllCities, getCityByName } = require('../controllers/cityControllers/index');
const { getAllCountries, getCountryById, getCountryByName, getCountersCountries } = require('../controllers/countryControllers/index');
const { getAllSports, getSportById, getSportByName } = require('../controllers/sportControllers/index');
const { createQuiz } = require('../controllers/quizControllers');

// Payment Gategway Imports
const createOrder = require('../controllers/paymentGateway/createOrder');
const feedback = require('../controllers/paymentGateway/feedback');
const inviteUser = require('../controllers/controllUsers/inviteUser');
// const reciveWebhook = require('../controllers/paymentGateway/reciveWebhook');

// Usuarios
router.get('/users/deleted', getAllUsersDeleted);//x
router.put('/user/reset', getUserReset);//x
router.get('/users', getAllUsers);//x
router.get('/user', getUserById);//x
router.get('/user/email', getUserByEmail);//x
router.put('/user', updateUser);//x
router.delete('/user/:id', deleteUser);//x
router.get('/users/ages', getAllUsersAge);//x
router.get('/users/average', getUsersAge);//x

// Invitado
router.post('/invite', inviteUser)

// Testimonios de Landing Content 
router.delete('/content/:id', deleteLandingContent);//x
router.put('/content/:id', uppdateLandingContent);//x
router.get('/content/:id', getOneLandingContent);//x
router.post('/content', createLandingContent);//x
router.get('/content', getAllLandingContent);//x

// Validaciones y Registro
router.post('/auth', createUserWithBody);// x
router.post('/login', loginUser);// x

// Modulos
router.get('/moduls', getAllModules);
router.get('/moduls/:id', getModuleById);
router.post('/moduls', createController);
router.put('/moduls/:id', updateController);
router.delete('/moduls/:id', deleteController);
router.put('/module/:moduleId/class/:classId', addClassToModule);

// Questions
router.post('/module/questions/:id', createQuiz);

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
router.get('/powerpoints', getAllPowerPoints);
router.get('/powerpoint/:id', getPowerPointById);
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
router.get('/countriesC', getCountersCountries)

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
