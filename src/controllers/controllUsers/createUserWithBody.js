const { Users } = require('../../models/Users.js');
const { encrypt } = require('../../services/crypt.js');
const findOrCreateNation = require('../../handler/dataBase/findOrCreateNation.js');
const findOrCreateCity = require('../../handler/dataBase/findOrCreateCity.js');
const findOrCreateSport = require('../../handler/dataBase/findOrCreateSport.js');
const { createToken } = require('../../services/token.js');

async function createUserWithBody(req, res, next) {
    const { email, password, username, provider, city, nationality, sport, expYearsSports, age } = req.body
    try{
        if(provider){
            if (!email) {
                throw Error("Falta el email del usuario");
            } else {
                const token = createToken(provider);
                const passwordEncrypt = await encrypt(token);
                await Users.create({
                    username,
                    role: 0,
                    email,
                    password: passwordEncrypt
                });
                return res.status(200).json({ success: "Cuenta creada correctamente" });
            }
        } else {
            if (!email || !username || !password || !city || !nationality || !sport || !expYearsSports || !age) {
                throw Error("Faltan datos del usuario");
            } else {
                const newSport = await findOrCreateSport(sport);
                const newCity = await findOrCreateCity(city);
                const newNation = await findOrCreateNation(nationality);
                const passwordEncrypt = await encrypt(password);
                await Users.create({
                    username,
                    role: 0,
                    email,
                    password: passwordEncrypt,
                    sport: newSport,
                    city: newCity,
                    nation: newNation,
                    age,
                    expYearsSports
                });
                return res.status(200).json({ success: "Cuenta creada correctamente" })
            }
        }
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
}
module.exports = createUserWithBody;
