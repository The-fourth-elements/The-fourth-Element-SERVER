const Sport = require("../../models/Sport");

async function getAllSports(req, res){
    try {
        const sports = await Sport.find({});
        if(!sports.length < 1){
            res.status(200).json(sports);
        } else throw Error('No hay deportes');
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = getAllSports;