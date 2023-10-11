const Quest = require("../../models/Quest");

async function getAllQuest(req, res, next){
    try {
        const quest = await Quest.find({});
        if(!quest) throw Error('No se encontraron quiz');
        return res.status(200).json(quest);
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
};

module.exports = getAllQuest;