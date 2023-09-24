const Module = require('../../models/Module');

const createContent = async (req, res, next) => {
    try {
        const { name, description, quiz } = req.body;
        if(!name || !description || !quiz) throw Error('Missing content');

        const newContent = await Module.create({ name, description, quiz });
        if(!newContent) throw Error('Error at create content');
        return res.status(201).json(newContent);
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
};

module.exports = createContent;