const express = require('express');
const router = express.Router();

const { getOneLandingContent, createLandingContent, deleteLandingContent, uppdateLandingContent, getAllLandingContent, getAllCountContents } = require('../controllers/landingContent');
const { createUserWithBody, loginUser, getAllUsers, updateUser, deleteUser, getUserById, getAllUsersDeleted, getUserReset, getUserByEmail, getAllUsersAge, getUsersAge, inviteUser, orderUsersByAZ } = require('../controllers/usersControllers/index');
const { createController, updateController, deleteController, getAllModules, addClassToModule, getModuleById, addQuizToModule, addExerciseToModule, addMeditationToModule, addSelfRegisterToModule } = require('../controllers/modulsController');
const { createClass, addVideoToClass, addQuizToClass, addPowerPointToClass, getAllClasses, getClassById, deleteClass, updateClass } = require('../controllers/classControllers/index');
const { createVideo, updateVideo, getAllVideos, getVideoById, deleteVideo } = require('../controllers/videoControllers/index')
const { updatePowerPoint, createPowerPoint, getAllPowerPoints, getPowerPointById, deletePowerPoint } = require('../controllers/powerPointControllers/index');
const { forgotPassword, resetPassword } = require('../controllers/authController');
const { getCityById, getAllCities, getCityByName } = require('../controllers/cityControllers/index');
const { getAllCountries, getCountryById, getCountryByName, getCountersCountries } = require('../controllers/countryControllers/index');
const { getAllSports, getSportById, getSportByName, getAllUsersSports } = require('../controllers/sportControllers/index');
const { createQuiz, deleteQuiz, updateQuiz, getOneQuiz, getAllQuiz } = require('../controllers/quizControllers');
const { startCourse, approveClass, approveModule } = require('../controllers/progressControllers/index')
const { deleteQuest, getOneQuest, getAllQuest } = require('../controllers/questControllers');
const { getAllResponses, getOneResponse, deleteResponse } = require('../controllers/responseController');
const { createOrderMP, feedbackMP, createOrderPP, feedbackPP, createOrderSP, getPricesSP, feedbackSP, cancelOrderStripe } = require('../controllers/paymentGateway');
const { createAbout, deleteAbout, getAboutById, getAllAbouts, putAbout } = require('../controllers/aboutControllers/index')
const { updateExercises, createExercises, deleteExercises, getAllExercises, getOneExercises, onlyCreateExercises, addExercisesToModule } = require('../controllers/exercisesControllers');
const { getMeditationById, getAllMeditations, deleteMeditation, updateMeditation, addMeditationToModuls, createMeditation } = require('../controllers/meditationControllers');
const { getTrackById, getAllTracks, deleteTrack } = require('../controllers/tracksControllers');
const { createSelfRegister, getAllSelfRegister, getSelfRegisterById, updateSelfRegister, deleteSelfRegister, onlyCreateSelfRegister } = require('../controllers/selfRegisterController');
const { createResponseEX, getOneResponseEX, getAllResponseEX, addResponseEXToUser, deleteResponseEX, getLatestResponsesEX } = require('../controllers/responsesEXController');
const { getAllResponseSR, getOneResponseSR, createResponseSR, addResponseSRToUser, deleteResponseSR } = require('../controllers/responsesSRController');
// Usuarios
router.get('/users', getAllUsers);
router.get('/user', getUserById);
router.get('/user/:email', getUserByEmail);
router.get('/users/ages', getAllUsersAge);
router.get('/users/average', getUsersAge);
router.get('/users/deleted', getAllUsersDeleted);
router.get('/orderUsersByAZ', orderUsersByAZ);
router.put('/user/reset', getUserReset);
router.put('/user', updateUser);
router.delete('/user/:id', deleteUser);

// Invitado
router.post('/invite', inviteUser);

// Testimonios de Landing Content 
router.get('/content', getAllLandingContent);
router.get('/content/:id', getOneLandingContent);
router.post('/content', createLandingContent);
router.put('/content/:id', uppdateLandingContent);
router.delete('/content/:id', deleteLandingContent);
router.get('/counter-contents', getAllCountContents);

// About de about us
router.get('/about', getAllAbouts);
router.get('/about/:id', getAboutById);
router.post('/about', createAbout);
router.put('/about/:id', putAbout);
router.delete('/about/:id', deleteAbout);

// Validaciones y Registro
router.post('/auth', createUserWithBody);
router.post('/login', loginUser);

// Modulos
router.get('/moduls', getAllModules);
router.get('/moduls/:id', getModuleById);
router.post('/moduls', createController);
router.put('/moduls/:id', updateController);
router.put('/module/:moduleId/class/:classId', addClassToModule);
router.put('/module/:moduleId/quiz/:quizId', addQuizToModule);
router.put('/module/:moduleId/exercise/:exerciseId', addExerciseToModule);
router.put('/module/:moduleId/selfR/:selfRId', addSelfRegisterToModule);
router.put('/module/:moduleId/meditation/:meditationId', addMeditationToModuls);
router.delete('/moduls/:id', deleteController);

// Quiz
router.get('/quizzes', getAllQuiz);
router.get('/quiz/:id', getOneQuiz);
router.post('/quiz', createQuiz);
router.put('/quiz/:id', updateQuiz);
router.delete('/quiz/:id', deleteQuiz);

// Questions
router.get('/questions', getAllQuest);
router.get('/quest/:id', getOneQuest);
router.delete('/quest/:id', deleteQuest);

// Responses
router.get('/responses', getAllResponses);
router.get('/response/:id', getOneResponse);
router.delete('/response/:id', deleteResponse);

// Clases
router.get('/class', getAllClasses);
router.get('/class/:id', getClassById);
router.post('/class', createClass);
router.put('/class/:id', updateClass);
router.put('/class/:classId/quiz/:quizId', addQuizToClass);
router.put('/class/:classId/video/:videoId', addVideoToClass);
router.put('/class/:classId/powerpoint/:powerPointId', addPowerPointToClass);
router.delete('/class/:id', deleteClass);

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
router.get('/users/sport', getAllUsersSports);

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
router.get('/stripe-cancel', cancelOrderStripe)
router.post('/create-order-sp', createOrderSP);

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
router.post('/exercise', onlyCreateExercises);
router.put('/exercise/:id', updateExercises);
router.delete('/exercise/:id', deleteExercises);
router.put('/exercisesToModule', addExercisesToModule);

// Meditations
router.get('/meditations', getAllMeditations);
router.get('/meditation/:id', getMeditationById);
router.post('/meditation', createMeditation);
router.put('/meditation/:id', updateMeditation);
router.delete('/meditation/:id', deleteMeditation);

// Tracks
router.get('/tracks', getAllTracks);
router.get('/track/:id', getTrackById);
router.delete('/track/:id', deleteTrack);

// Autoregistro
router.get('/selfRegisters', getAllSelfRegister);
router.get('/selfR/:id', getSelfRegisterById);
router.post('/selfR/:moduleId', createSelfRegister);
router.post('/selfR', onlyCreateSelfRegister);
router.put('/selfR/:id', updateSelfRegister);
router.delete('/selfR/:id', deleteSelfRegister);

// Respuestas de los ejercicios
router.get('/responseEx/:id', getOneResponseEX);
router.get('/responseEx', getAllResponseEX);
router.get('/responseExl/:exerciseId/:userId', getLatestResponsesEX);
router.post('/responseEx/:exerciseId/user/:userId', createResponseEX);
router.put('/responseEx/:responseExId/user/:userId', addResponseEXToUser);
router.delete('/responseEx/:responseExId/user/:userId', deleteResponseEX);

// Respuestas del auto-registro
router.get('/responseSR', getAllResponseSR);
router.get('/responseSR/:id', getOneResponseSR);
router.post('/responseSR/:selfRegisterId/user/:userId', createResponseSR);
router.put('/responseSR/:responseSRId/user/:userId', addResponseSRToUser);
router.delete('/responseSR/:responseSRId/user/:userId', deleteResponseSR);

module.exports = router;