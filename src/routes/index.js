const express = require('express');
const router = express.Router();

const { getOneLandingContent, createLandingContent, deleteLandingContent, uppdateLandingContent, getAllLandingContent } = require('../controllers/landingContent');
const { createUserWithBody, loginUser, getAllUsers, updateUser, deleteUser, getUserById, getAllUsersDeleted, getUserReset, getUserByEmail, getAllUsersAge, getUsersAge, inviteUser, orderUsersByAZ } = require('../controllers/usersControllers/index');
const { createController, updateController, deleteController, getAllModules, addClassToModule, getModuleById, addQuizToModule } = require('../controllers/modulsController');
const { createClass, addVideoToClass, addQuizToClass, addPowerPointToClass, getAllClasses, getClassById, deleteClass, updateClass } = require('../controllers/classControllers/index');
const { createVideo, updateVideo, getAllVideos, getVideoById, deleteVideo } = require('../controllers/videoControllers/index')
const { updatePowerPoint, createPowerPoint, getAllPowerPoints, getPowerPointById, deletePowerPoint } = require('../controllers/powerPointControllers/index');
const { forgotPassword, resetPassword } = require('../controllers/authController');
const { getCityById, getAllCities, getCityByName } = require('../controllers/cityControllers/index');
const { getAllCountries, getCountryById, getCountryByName, getCountersCountries } = require('../controllers/countryControllers/index');
const { getAllSports, getSportById, getSportByName } = require('../controllers/sportControllers/index');
const { createQuiz, deleteQuiz, updateQuiz, getOneQuiz, getAllQuiz } = require('../controllers/quizControllers');
const { startCourse, approveClass, approveModule } = require('../controllers/progressControllers/index')
const { deleteQuest, getOneQuest, getAllQuest } = require('../controllers/questControllers');
const { getAllResponses, getOneResponse, deleteResponse } = require('../controllers/responseController');
const { createOrderMP, feedbackMP, createOrderPP, feedbackPP, createOrderSP, getPricesSP, feedbackSP, cancelOrderStripe } = require('../controllers/paymentGateway');
const { createAbout, deleteAbout, getAboutById, getAllAbouts, putAbout } = require('../controllers/aboutControllers/index')
const { updateExercises, createExercises, deleteExercises, getAllExercises, getOneExercises } = require('../controllers/exercisesControllers');
const createMeditation = require('../controllers/meditationControllers/createMeditation');
const { getMeditationById, getAllMeditations, deleteMeditation, updateMeditation } = require('../controllers/meditationControllers');
const { getTrackById, getAllTracks, deleteTrack } = require('../controllers/tracksControllers');
const { createSelfKnowledge, getAllSelfKnowledge, getSelfKnowledgeById, updateSelfKnowledge, deleteSelfKnowledge } = require('../controllers/selfKnowledge');

// Usuarios
router.get('/users/deleted', getAllUsersDeleted);
router.put('/user/reset', getUserReset);
router.get('/users', getAllUsers);
router.get('/user', getUserById);
router.get('/user/:email', getUserByEmail);
router.put('/user', updateUser);
router.delete('/user/:id', deleteUser);
router.get('/users/ages', getAllUsersAge);
router.get('/users/average', getUsersAge);
router.get('/orderUsersByAZ', orderUsersByAZ);

// Invitado
router.post('/invite', inviteUser);

// Testimonios de Landing Content 
router.delete('/content/:id', deleteLandingContent);
router.put('/content/:id', uppdateLandingContent);
router.get('/content/:id', getOneLandingContent);
router.post('/content', createLandingContent);
router.get('/content', getAllLandingContent);

// About de about us
router.post('/about', createAbout);
router.get('/about', getAllAbouts);
router.delete('/about/:id', deleteAbout);
router.put('/about/:id', putAbout);
router.get('/about/:id', getAboutById);

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
router.get('/quizzes', getAllQuiz);
router.get('/quiz/:id', getOneQuiz);
router.post('/quiz', createQuiz);
router.put('/quiz/:id', updateQuiz);
router.delete('/quiz/:id', deleteQuiz);

// Questions
router.get('questions', getAllQuest);
router.get('quest/:id', getOneQuest);
router.delete('/quest/:id', deleteQuest);

// Responses
router.get('responses', getAllResponses);
router.get('response/:id', getOneResponse);
router.delete('/response/:id', deleteResponse);

// Clases
router.get('/class', getAllClasses);
router.get('/class/:id', getClassById);
router.post('/class', createClass);
router.put('/class/:classId/quiz/:quizId', addQuizToClass);
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
router.get('/countriesC', getCountersCountries);

// Deportes
router.get('/sports', getAllSports);
router.get('/sport/:id', getSportById);
router.get('/sport', getSportByName);

// Pasarela de pagos //

// Mercadopago
router.post('/create-order-mp', createOrderMP);
router.get('/feedback', feedbackMP);

// PayPal 
router.post('/create-order-pp', createOrderPP)
router.put('/feedback-pp', feedbackPP);

// Stripe
router.get('/get-prices-sp', getPricesSP);
router.get('/feedback-sp', feedbackSP);
router.post('/create-order-sp', createOrderSP);
router.get('/stripe-cancel', cancelOrderStripe)

// Reseteo de contraseña
router.post('/auth/forgot', forgotPassword);
router.post('/reset-password', resetPassword);

// Progreso
router.post('/startCourse/:userId', startCourse);
router.put('/approve/user/:userId/module/:moduleId/class/:classId', approveClass);
router.put('/approveModule/user/:userId/module/:moduleId', approveModule);

// Ejercicios
router.get('/exercise/:id', getOneExercises);
router.get('/exercises', getAllExercises);
router.post('/exercise/:moduleId', createExercises);
router.put('/exercise/:id', updateExercises);
router.delete('/exercise/:id', deleteExercises);

// Meditations
router.get('/meditations', getAllMeditations);
router.get('/meditation/:id', getMeditationById);
router.post('/meditation', createMeditation);
router.put('/meditation/:id', updateMeditation)
router.delete('/meditation/:id', deleteMeditation);

// Tracks
router.get('/tracks', getAllTracks);
router.get('/track/:id', getTrackById);
router.delete('/track/:id', deleteTrack);

// Autoconocimiento
router.get('/selfKnowledges', getAllSelfKnowledge);
router.get('/selfK/:id', getSelfKnowledgeById);
router.post('/selfK/:moduleId', createSelfKnowledge);
router.put('/selfK/:id', updateSelfKnowledge);
router.delete('/selfK/:id', deleteSelfKnowledge);

module.exports = router;