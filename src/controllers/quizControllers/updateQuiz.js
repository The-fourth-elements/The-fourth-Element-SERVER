const Quiz = require('../../models/Quiz');
const handlerUpdateQuest = require('../../handler/Quiz/handlerUpdateQuest')

async function updateQuiz(req, res, next){
    try {
        const { id } = req.params;
        const { quiz } = req.body;
        if(!id) throw Error('Ingrese un ID');
        if(!quiz) throw Error('Faltan datos');
        const searchQuiz = await Quiz.findByIdAndUpdate(id, {
            name: quiz.name,
            description: quiz.description,
            results: quiz.results
        });
        if(!searchQuiz) throw Error (`No se encontro la quiz con ID: ${id}`);
        if(quiz?.quest) {
            const questUpdate = await Promise.all(quiz.quest.map(question => handlerUpdateQuest(question)));
            searchQuiz.quest = questUpdate;
            await searchQuiz.save();
        }
        return res.status(200).json(searchQuiz);
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
};

module.exports = updateQuiz;