const Nation = require("../../models/Nation");

async function getCountryById(req, res, next){
    try {
        const { id } = req.params;
        if(!id) throw Error('Ingrese un ID');
        const country = await Nation.findById(id);
        if (country) {
            res.status(200).json(country);
        } else throw Error('Pais no encontrado.');
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = getCountryById;