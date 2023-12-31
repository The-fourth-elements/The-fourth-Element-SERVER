const Quiz = require('../../models/Quiz');

async function deleteQuiz(req, res, next){
    try {
        const { id } = req.params;
        if(!id) throw Error('Ingrese un ID');
        const quizDelete = await Quiz.findByIdAndDelete(id);
        if(!quizDelete) throw Error('Pregunta no encontrada');
        return res.status(200).json({ message: "Pregunta borrada con exito" });
    } catch (error) {
        next({ message: error.message, statusCode: 400});
    }
};

module.exports = deleteQuiz;