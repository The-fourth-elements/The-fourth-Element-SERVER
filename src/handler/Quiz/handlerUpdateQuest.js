const Quest = require('../../models/Quest');
const handlerUpdateResponse = require('./handlerUpdateResponse');

async function handlerUpdateQuest(quest){
    try {
        if(!quest) throw Error('Faltan datos');
        const updateQuest = await Quest.create({
            question: quest.question,
            approved: quest.approved
        });
        if(!updateQuest) throw Error('Ocurrio un error al actualizar la pregunta');
        if(quest.answers){
            const updateResponse = await Promise.all(quest.answers.map(response => handlerUpdateResponse(response)));
            updateQuest.responses = updateResponse;
            await updateQuest.save();
        };
        return updateQuest;
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = handlerUpdateQuest;