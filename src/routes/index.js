const express = require('express');
const router = express.Router();
const getAllUsers = require('../controllers/getAllUsers');
const postUser = require ('../controllers/postUser');

router.get('/', getAllUsers);
router.post('ruta', postUser);
// router.get('ruta', funcion);
// router.get('ruta', funcion);


module.exports = router;