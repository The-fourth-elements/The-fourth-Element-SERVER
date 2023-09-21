const firebaseAdmin = require('../services/firebase.js')
const { Users } = require('../models/Users.js')

async function createUserWithEmailAndPassword(req, res) {
    const { email, password, name } = req.body
    if (!email || !name || !password) {
        return res.status(400).json({error:"Faltan datos del usuario"});
    }
    
    try {
        const newFirebaseUser = await firebaseAdmin.auth.createUser({
            email,
            password,
          });
        if (newFirebaseUser) {
            await Users.create({
                name,
                firebaseID: newFirebaseUser.uid,
                email,
                password
            })

            return res.status(200).json({success: "cuenta creada correctamente"})
        }
    } catch (error) {
        if (error) {
            return res.status(400).json(error.message);
        }
        return res.status(500).json({ error: "server error" });
    }
}

module.exports = createUserWithEmailAndPassword