const firebaseAdmin = require('../../services/firebase.js')
const { Users } = require('../../models/Users.js');
const { encrypt } = require('../../services/crypt.js');
const findOrCreateNation = require('../../handler/dataBase/findOrCreateNation.js');
const findOrCreateCity = require('../../handler/dataBase/findOrCreateCity.js');

async function createUserWithBody(req, res) {
    const { email, password, username, provider, city, nationality } = req.body;
    console.log(req.body);
    try{
        if(provider){
            if (!email) {
                throw Error("Falta el email del usuario");
            } else {
                const passwordEncrypt = await encrypt("password");
                await Users.create({
                    username,
                    role: 0,
                    email,
                    password: passwordEncrypt,
                    city: "none",
                    nation: "none"
                });
                return res.status(200).json({ success: "Cuenta creada correctamente" });
            }
        } else {
            if (!email || !username || !password || !city || !nationality) {
                throw Error("Faltan datos del usuario");
            } else {
                const newCity = await findOrCreateCity(city)
                const newNation = await findOrCreateNation(nationality)
                const passwordEncrypt = await encrypt(password)
                await Users.create({
                    username,
                    role: 0,
                    email,
                    password: passwordEncrypt,
                    city: newCity,
                    nation: newNation
                });
                return res.status(200).json({ success: "Cuenta creada correctamente" })
            }
        }
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
}
module.exports = createUserWithBody;
