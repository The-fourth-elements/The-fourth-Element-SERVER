const express = require('express');
const router = express.Router();
const createGoogleUser = require('../controllers/createGoogleUser.controller');
const {userCreateController,userGetController, userLoginController, userGetAllController, userDelete, userUpdate} = require('../controllers/userController');
const { forgotPassword, resetPassword } = require('../controllers/authController');
const {courseModuleController, getCourseModuleController, getAllCourseModuleController,updateCourseModuleController,deleteCourseModuleController} = require('../controllers/courseModuleController')
//crear y recibir informacion de un usuario.
router.get('/users', userGetAllController);
router.get('/user', userGetController);
router.put('/user', userUpdate);
router.post('/user', userCreateController);
router.delete('/user/:id', userDelete);

//validar información de usuario
router.get('/signin', createGoogleUser);
router.post('/login', userLoginController);

//forgot-password
router.post('/auth/forgot', forgotPassword);
router.post('/reset-password', resetPassword);

//course-management

router.get('/module',getCourseModuleController)
router.get('/module/all',getAllCourseModuleController)
router.post('/module/add',courseModuleController)
router.put('/module/update',updateCourseModuleController)
router.delete('/module/delete',deleteCourseModuleController)



module.exports = router;