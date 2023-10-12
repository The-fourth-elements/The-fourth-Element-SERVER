const Module = require("../../models/Module");
const Quiz = require("../../models/Quiz");

async function addQuizToModule(req, res, next){
    const { moduleId, quizId } = req.params;
    try {
        const findModule= await Module.findById(moduleId);
        if (!findModule) throw Error('Módulo no encontrado');
        const findQuiz = await Quiz.findById(quizId)
        if (!findQuiz) throw Error('Quiz no encontrado');
        findModule.quiz.push(findQuiz)
        await findModule.save();
        return res.status(200).json({ message: 'Quiz agregado al módulo con éxito' })
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = addQuizToModule;