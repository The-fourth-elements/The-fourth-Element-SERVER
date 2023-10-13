const Quiz = require('../../models/Quiz');

async function getOneQuiz (req, res, next){
    try {
        const { id } = req.params;
        if(!id) throw Error('Ingrese un ID');
        const quiz = await Quiz.findById(id).populate({
            path: 'quest',
            populate: {
                path: 'responses'
            }
        });
        if(!quiz) throw Error(`No se encontro la quiz con ID: ${id}`);
        return res.status(200).json(quiz);
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
};

module.exports = getOneQuiz;