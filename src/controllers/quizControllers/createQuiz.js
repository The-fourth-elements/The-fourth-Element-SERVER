const Quiz = require('../../models/Quiz');
const createQuest = require('../../handler/dataBase/createQuest');

async function createQuiz(req, res, next){
    const { name, quest } = req.body;
    try {
        if(!name || !quest) throw Error('Faltan el nombre');
        const newQuest = await Promise.all(quest.map(async question => await createQuest(question)));
        console.log(newQuest);
        const newQuiz = await Quiz.create({ 
            name,
            results: 0
        });
        if(!newQuiz) throw Error('No se pudo crear la Quiz');
        newQuiz.quest = newQuest;
        await newQuiz.save();

        return res.status(200).json(newQuiz);
    } catch (error) {
        next({ message: error.message, statusCode: 400});
    }
};

module.exports = createQuiz;