const firebaseAdmin = require('../../services/firebase.js')
const { Users } = require('../../models/Users.js');
const findOrCreateNation = require('../../handler/dataBase/findOrCreateNation.js');
const findOrCreateCity = require('../../handler/dataBase/findOrCreateCity.js');

async function createUserWithBody(req, res) {
    const { email, password, username } = req.body
    console.log(req.body);
    console.log('holi');
    if (!email || !username || !password ) {
        return res.status(400).json({error:"Faltan datos del usuario"});
    } else {
        console.log(email, username, password);
        try {
        
                await Users.create({
                    
                    username,
                    role: 0,
                    email,
                    password,
                });
                return res.status(200).json({success: "Cuenta creada correctamente"})
            }
         catch (error) {
            if (error) {
                return res.status(400).json(error.message);
            }
            return res.status(500).json({ error: "server error" });
        }
    }
}

module.exports = createUserWithBody;
