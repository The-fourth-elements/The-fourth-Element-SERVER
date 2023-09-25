const Module = require('../../models/Module');

const createContent = async (req, res, next) => {
    try {
        const { name, description, quiz, paid } = req.body;
        console.log(name, description, quiz, paid);
        if(!name || !description || !quiz ) throw Error('Missing content');
        const newContent = await Module.create({ name, description, quiz, paid });
        if(!newContent) throw Error('Error at create content');
        return res.status(201).json(newContent);
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
};

module.exports = createContent;