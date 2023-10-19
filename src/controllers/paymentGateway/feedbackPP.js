const { Users } = require("../../models/Users");

async function feedbackPP(req, res, next){
    const { idUser } = req.body;
    try {
        if (!idUser) throw Error('No se ha recibido un ID');
        const updatedUser = await Users.findByIdAndUpdate(idUser, { role: 1 }, { new: true });
        if (!updatedUser) throw Error('No se pudo cambiar el rol del usuario');
        res.status(200).json(updatedUser);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = feedbackPP;