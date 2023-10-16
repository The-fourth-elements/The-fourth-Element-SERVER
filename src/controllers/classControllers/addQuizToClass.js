const Class = require ('../../models/Class');
const Quiz = require('../../models/Quiz');

async function addQuizToClass(req, res, next){
    try {
        const { classId, quizId} = req.params;
        const searchClass = await Class.findById(classId);
        if(!searchClass) throw Error('Clase no encontrada');
        const searchQuiz = await Quiz.findById(quizId);
        if(!searchQuiz) throw Error('Quiz no encontrado');
        searchClass.quiz = searchQuiz;
        await searchClass.save();
        return res.status(200).json({ message: 'Quiz agregado a la clase con éxito' });
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = addQuizToClass;