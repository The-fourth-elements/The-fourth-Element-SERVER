const firebaseAdmin = require('../services/firebase.js')
const { getAuth } = require('firebase-admin/auth')
const { Users } = require('../models/Users.js')

async function createGoogleUser(req, res) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({access: false, error: "Token de autenticación no proporcionado" });
    }

    const decodedToken = await getAuth().verifyIdToken(token)
    const { email, uid, name, picture } = decodedToken

    const userOnDB = await Users.findOne({ firebaseID: uid })
    if (userOnDB) {
        return res.status(200).json({ access: true, userOnDB })
    }

    try {
        const user = await Users.create({
            firebaseID: uid,
            email,
            name,
            profile_img: picture,
            password: 'notAValidPassword123'
        })
        if (user) return res.status(200).json({ access: true, user })
    } catch (error) {
        return res.status(500).json({ access: true, error: "server error" })
    }
}

module.exports = createGoogleUser