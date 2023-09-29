const Sport = require("../../models/Sport");

async function getAllSports(req, res){
    try {
        const sports = await Sport.find({});
        console.log(sports);
        if(!sports.length < 1){
            res.status(200).json(sports);
        } else throw Error('No hay deportes');
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
}

module.exports = getAllSports;