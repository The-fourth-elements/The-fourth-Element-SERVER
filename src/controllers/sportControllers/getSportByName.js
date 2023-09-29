const Sport = require("../../models/Sport");

async function getSportByName(req, res){
    const { name } = req.query;
    try {
        const sport = await Sport.findOne({name});
        if (sport) {
            res.status(200).json(sport);
        } else throw Error('No se encontró el deporte');
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
}

module.exports = getSportByName;