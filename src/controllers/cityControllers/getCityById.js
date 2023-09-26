const City = require('../../models/City');

async function getCityById(req, res){
    const { id } = req.params;
    try {
        const city = await City.findById(id);
        if (city) {
            res.status(200).json(city);
        } else throw Error('City not found');
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

module.exports = getCityById;