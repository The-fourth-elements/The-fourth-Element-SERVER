const express = require('express');
const router = express.Router();

const { 
    userCreateController, 
    userGetController, 
    userLoginController, 
    userGetAllController
} = require('../controllers/userController')
 
//crear y recibir informacion de un usuario.
router.post('/user', userCreateController);
router.post('/login', userLoginController)
router.get('/user',  userGetController);
router.get('/users',userGetAllController)



module.exports = router;