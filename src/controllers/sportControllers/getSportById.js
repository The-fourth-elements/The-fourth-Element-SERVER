const Sport = require("../../models/Sport");

async function getSportById(req, res){
    const { id } = req.params;
    try {
        const sport = await Sport.findById(id);
        if (sport) {
            res.status(200).json(sport);
        } else throw Error('No se encontró el deporte');
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = getSportById;