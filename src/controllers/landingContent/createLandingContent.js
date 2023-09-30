const LandingContent = require("../../models/LandingContent");

async function createLandingContent(req, res, next){
    try {
        const { testimonials, image, video } = req.body;
        if (!testimonials || !image || !video) throw Error('Faltan datos');
        const newContent = await LandingContent.create({ testimonials, image, video });
        if (newContent) return res.status(201).json(newContent);
        throw Error ('Error al crear contenido');
    } catch (error) {
        next({message: error.message, statusCode: 404});
    }
}

module.exports = createLandingContent;