

const { createToken } = require('../services/token')

const { encrypt } = require('../services/crypt');
const { Users } = require('../models/Users');


// logeo del usuario
async function userLoginController(req, res, next) {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const user = await Users.login(email, password);
        if (!user?.error) {
            const token = createToken(String(user._id));
            res.cookie("jwt", token, { httpOnly: true });
            res.status(200).json({ token: token, success: true, message: "Login successful" });
        }
        else throw Error("The email or password is invalid")
    } catch (error) {
        next({ message: error.message, statusCode: 404 })
    }
}

// async function roleAuth(req, res, next) {
//     const algo = req.headers
//     const userRole = User.findOne(algo.id === User._id, algo.role === User.role)
// }


module.exports = userLoginController