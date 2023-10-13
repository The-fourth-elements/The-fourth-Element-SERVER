const About = require("../../models/About");

const getAllAbouts = async (request, response, next) => {
    try {
        const abouts = await About.find({});
        if (abouts) return response.status(200).json(abouts);
        throw Error("No se pudo obtener la infomación");
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = getAllAbouts;
