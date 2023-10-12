const Quest = require('../../models/Quest');
const handlerUpdateResponse = require('./handlerUpdateResponse');

async function handlerUpdateQuest(quest){
    try {
        if(!quest) throw Error('Faltan datos');
        const updateQuest = await Quest.create({
            question: quest.quest,
            aproved: quest.aproved
        });
        if(!updateQuest) throw Error('Ocurrio un error al actualizar la pregunta');
        if(quest.responses){
            const updateResponse = await Promise.all(quest.responses.map(response => handlerUpdateResponse(response)));
            updateQuest.responses = updateResponse;
            await updateQuest.save();
        };
        return updateQuest;
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = handlerUpdateQuest;