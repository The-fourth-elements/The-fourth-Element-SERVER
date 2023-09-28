const { createToken, decriptToken } = require('../../services/token')
const { encrypt } = require('../../services/crypt');
const { Users } = require('../../models/Users');

async function loginUser(req, res, next) {
    const { email, password, provider } = req.body;
    try {
        if (email) {
            const user = await Users.findOne({email});
            if(user) {
                console.log(user);
                const payload = {
                    id: user._id,
                    username: user.username,
                    city: user.city, 
                    country: user.nation, 
                    role: user.role, 
                    email: user.email
                }
                if(provider){
                    const token = createToken(payload);
                    res.cookie("jwt", token, { httpOnly: true });
                    res.status(200).json({ token: token, success: true, message: "Login successful" });
                } else {
                    const normalUser = await Users.login(email, password);
                    if (!normalUser?.error) {
                        const token = createToken(payload);
                        res.cookie("jwt", token, { httpOnly: true });
                        res.status(200).json({ token: token, success: true, message: "Login successful" });
                    } else throw Error("The email or password is invalid");
                }
            } else throw Error("User not registered");
        } else throw Error("Email not registered")
    } catch (error) {
        next({ message: error.message, statusCode: 404 })
    }
}

module.exports = loginUser