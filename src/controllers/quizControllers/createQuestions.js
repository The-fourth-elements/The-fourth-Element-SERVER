const Module = require('../../models/Module');
const Quiz = require('../../models/Quiz');
const Repsonses = require('../../models/Repsonses');

async function createQuiz(req, res, next){
    try {
        const { quest, responses } = req.body;
        const { id } = req.params;
        if(!quest || !responses) throw Error('Faltan datos');
        if(!id) throw Error('Ingrese un ID');

        const newResponse = await Repsonses.create({ 
            verdadera: responses.verdadera, 
            response: responses.response
        });
        const newQuest = await Quiz.create({ quest, newResponse });
        if(!newQuest) throw Error('No se pudo crear quiz');

        const module = await Module.findById(id);
        if (!module) throw Error('No se encontró el módulo');
        module.quiz.push(newQuest);
        await module.save();
        
        return res.status(200).json(newQuest);
        // return res.status(200).json({ message: "Quiz creada con exito" });
    } catch (error) {
        next({ message: error.message, statusCode: 400});
    }
};


module.exports = createQuiz;