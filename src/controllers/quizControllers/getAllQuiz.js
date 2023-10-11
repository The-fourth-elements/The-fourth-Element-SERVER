const Quiz = require('../../models/Quiz');

async function getAllQuiz (req, res, next){
    try {
        const quiz = await Quiz.find({}).populate("quest").populate("results");
        if(!quiz) throw Error('No se encontraron quiz');
        return res.status(200).json(quiz);
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
};

module.exports = getAllQuiz