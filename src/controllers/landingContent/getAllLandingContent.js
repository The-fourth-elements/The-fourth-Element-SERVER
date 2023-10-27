const LandingContent = require("../../models/LandingContent");

const getAllLandingContent = async (req, res, next) => {
    try {
        const getAll = await LandingContent.find();
        if(getAll.length <= 0) throw Error('No se ha encontrado contenido');
        return res.status(200).json(getAll);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = getAllLandingContent;