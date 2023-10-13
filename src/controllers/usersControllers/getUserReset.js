const { Users } = require('../../models/Users');

const getUserReset = async (req, res, next) => {
    try {
        const { email } = req.body;
        if(!email) throw Error('Faltan datos.');
        const user = await Users.findOneDeleted({ email });
        if(!user) throw Error('No se hallaron coincidencias');
        const desbanUser = await Users.updateOneDeleted({_id: user._id}, { $set: { deleted: false } }, { new: true });
        return res.status(200).json({ success: "Usuario restablecido exitosamente" });
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
};

module.exports = getUserReset;