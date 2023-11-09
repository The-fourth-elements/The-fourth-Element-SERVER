const Sport = require("../../models/Sport");

async function getSportByName(req, res, next){
    const { name } = req.query;
    try {
        const sport = await Sport.findOne({name});
        if (sport) {
            res.status(200).json(sport);
        } else throw Error('No se encontró el deporte');
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = getSportByName;
