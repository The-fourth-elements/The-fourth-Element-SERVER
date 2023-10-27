const Quest = require("../../models/Quest");

async function getAllQuest(req, res, next){
    try {
        const quest = await Quest.find({}).populate('responses');
        if(quest.length <= 0) throw Error('No se encontraron questions');
        return res.status(200).json(quest);
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
};

module.exports = getAllQuest;