const express = require('express');
const router = express.Router();

const { getOneLandingContent, createLandingContent, deleteLandingContent, uppdateLandingContent, getAllLandingContent } = require('../controllers/landingContent');
const { createUserWithBody, loginUser, getAllUsers, updateUser, deleteUser, getUserById, getAllUsersDeleted, getUserReset, getUserByEmail, getAllUsersAge, getUsersAge } = require('../controllers/usersControllers/index');
const { createController, updateController, deleteController, getAllModules, addClassToModule, getModuleById, addQuizToModule } = require('../controllers/modulsController');
const { createClass, addVideoToClass, addPowerPointToClass, getAllClasses, getClassById, deleteClass, updateClass } = require('../controllers/classControllers/index');
const { createVideo, updateVideo, getAllVideos, getVideoById, deleteVideo } = require('../controllers/videoControllers/index')
const { updatePowerPoint, createPowerPoint, getAllPowerPoints, getPowerPointById, deletePowerPoint } = require('../controllers/powerPointControllers/index');
const { forgotPassword, resetPassword } = require('../controllers/authController');
const { getCityById, getAllCities, getCityByName } = require('../controllers/cityControllers/index');
const { getAllCountries, getCountryById, getCountryByName, getCountersCountries } = require('../controllers/countryControllers/index');
const { getAllSports, getSportById, getSportByName } = require('../controllers/sportControllers/index');
const { createQuiz, deleteQuiz, updateQuiz } = require('../controllers/quizControllers');
const {startCourse, approveClass} = require('../controllers/progressControllers/index')
const { deleteQuest } = require('../controllers/questControllers');
const { delteResponse } = require('../controllers/responseController');
const inviteUser = require('../controllers/usersControllers/inviteUser');
const createOrder = require('../controllers/paymentGateway/createOrder');
const feedback = require('../controllers/paymentGateway/feedback');

// Usuarios
router.get('/users/deleted', getAllUsersDeleted);//x
router.put('/user/reset', getUserReset);//x
router.get('/users', getAllUsers);//x
router.get('/user', getUserById);//x
router.get('/user/:email', getUserByEmail);//x
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
router.post('/auth', createUserWithBody);
router.post('/login', loginUser);

// Modulos
router.get('/moduls', getAllModules);
router.get('/moduls/:id', getModuleById);
router.post('/moduls', createController);
router.put('/moduls/:id', updateController);
router.delete('/moduls/:id', deleteController);
router.put('/module/:moduleId/class/:classId', addClassToModule);
router.put('/module/:moduleId/quiz/:quizId', addQuizToModule);

// Quiz
router.post('/quiz', createQuiz);
router.post('/deleteQuiz/:id', deleteQuiz);
router.put('/updateQuiz/:id', updateQuiz);

// Questions
router.delete('/deleteQuest/:id', deleteQuest);

// Responses
router.delete('/deleteResponse/:id', delteResponse);

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

//progreso
router.post('/startCourse/:userId', startCourse)
router.put('/approve/user/:userId/module/:moduleId/class/:classId', approveClass)

module.exports = router;
