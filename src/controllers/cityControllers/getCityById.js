const City = require('../../models/City');

async function getCityById(req, res, next){
    try {
        const { id } = req.params;
        if(!id) throw Error('Ingrese un id');
        const city = await City.findById(id);
        if (city) {
            res.status(200).json(city);
        } else throw Error('Ciudad no encontrada.');
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = getCityById;