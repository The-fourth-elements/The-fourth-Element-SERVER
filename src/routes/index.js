const express = require('express');
const router = express.Router();

const {userCreateController,userGetController} = require('../controllers/userController')
 
//crear y recibir informacion de un usuario.
router.post('/user', userCreateController);
router.get('/user',  userGetController);


// router.get('ruta', funcion);  
// router.get('ruta', funcion);
// router.post('ruta', funcion);


module.exports = router;