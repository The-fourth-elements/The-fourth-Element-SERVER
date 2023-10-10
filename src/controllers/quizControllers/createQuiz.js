const Module = require('../../models/Module');
const Quiz = require('../../models/Quiz');
const Responses = require('../../models/Responses');
const Quest = require('../../models/Quest');

async function createQuiz(req, res, next){
    try {
        const { quest, responses } = req.body;
        const { id } = req.params;
        if(!quest || !responses) throw Error('Faltan datos');
        if(!id) throw Error('Ingrese un ID');

        const newResponse = await Responses.create({ 
            verdadera: responses.verdadera, 
            response: responses.response
        });

        const newQuest = await Quest.create({ quest })

        const newQuiz = await Quiz.create({ newQuest, newResponse });
        if(!newQuiz) throw Error('No se pudo crear quiz');

        const module = await Module.findById(id);
        if (!module) throw Error('No se encontró el módulo');
        module.quiz.push(newQuiz);
        await module.save();
        
        return res.status(200).json(newQuiz);
        // return res.status(200).json({ message: "Quiz creada con exito" });
    } catch (error) {
        next({ message: error.message, statusCode: 400});
    }
};


module.exports = createQuiz;