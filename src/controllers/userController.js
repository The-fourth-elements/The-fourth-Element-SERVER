const { Users } = require('../models/Users')
const { handleUserDB, handleAllUserDB }= require('../handler/handleUserDB')
const { createToken } = require('../services/token')
const findOrCreateCity = require('../handler/findOrCreateCity');
const { encrypt } = require('../services/crypt');
const findOrCreateNation = require('../handler/findOrCreateNation')
const Content = require('../models/Content');

//obtener usuario por id

//obtener todos los usuarios

//registro de usuario
// async function userCreateController (req, res, next){
//     try {
//         const user = req.body;
//         const city = await findOrCreateCity(user.city)
//         const nation = await findOrCreateNation(user.nation)
//         const password = await encrypt(user.password);

//         if (!city && !nation) throw Error("City or nation can't be created or found");
//         const newUser = await Users.create({...user, role: 0, city: city._id, password: password, nation: nation._id});
//         if (newUser){
//             const token = createToken(String(newUser._id));
//             res.cookie("jwt",token, {httpOnly: true });
//             res.status(200).json({ access:true, message: "User created"});
//         } else throw Error('Could not create user.')
//     } catch (error) {
//         next({message: error.message, statusCode: 400})
//     }
// }

// logeo del usuario
// async function userLoginController(req, res, next){
//     try {
//         const { email, password } = req.body;
//         const user = await Users.login(email,password);
//         if (!user?.error){
//             const token =  createToken(String(user._id));
//             res.cookie("jwt",token,{ httpOnly: true });
//             res.status(200).json({ success: true, message: "Login successful" });        
//         }
//         else throw Error("The email or password is invalid")
//     } catch (error) {
//         next({message: error.message, statusCode: 404})
//     }
// }

// async function roleAuth (req, res, next){
//     const algo = req.headers
//     const userRole = User.findOne(algo.id === User._id, algo.role === User.role )
// }
