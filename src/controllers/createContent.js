const Content = require("../models/Content");

async function createContent(req, res, next){
    try {
        const { body } = req;
        if (!body) throw Error('Missing things');
        const newContent = await Content.create(body);
        if (newContent) return res.status(201).json(newContent);
        throw Error ('Error creating content');
    } catch (error) {
        next({message: error.message, statusCode: 404});
    }
}

module.exports = createContent;