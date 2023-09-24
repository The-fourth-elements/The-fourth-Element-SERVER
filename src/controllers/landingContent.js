const LandingContent = require("../models/LandingContent");

async function landingContent(req, res, next){
    try {
        const { body } = req;
        if (!body) throw Error('Missing things');
        const newContent = await LandingContent.create(body);
        if (newContent) return res.status(201).json(newContent);
        throw Error ('Error creating content');
    } catch (error) {
        next({message: error.message, statusCode: 404});
    }
}

module.exports = landingContent;