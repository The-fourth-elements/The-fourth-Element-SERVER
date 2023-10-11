const Quest = require("../../models/Quest");

async function updateQuest (req, res, next){
    try {
        const { id } = req.params;
        const { body } = req;
        const quest = await Quest.findByIdAndUpdate(id, body, {new: true});
        if(!quest) throw Error('No se pudo actualizar la pregunta');
        return res.status(200).json(quest);
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
};

module.exports = updateQuest;