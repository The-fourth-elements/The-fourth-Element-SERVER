const { getAuth } = require('firebase-admin/auth')
const { Users } = require('../../models/Users.js')

async function createUserWithGoogle(req, res) {

    const { email, uid, username, picture } = decodedToken
    const userOnDB = await Users.findOne({ firebaseID: uid })
    if (userOnDB) {
        return res.status(200).json({ message: 'El usuario ya se encuentra registrado' })
    }
    try {
        const user = await Users.create({
            firebaseID: uid,
            username,
            role: 0,
            city,
            nation,
            picture,
            email,
            password: 'notAValidPassword123'
        });
        if (user) return res.status(200).json({ message: 'Usuario creado con éxito' })
    } catch (error) {
        return res.status(500).json({ access: false, error: "server error" })
    }
}

module.exports = createUserWithGoogle;
