const findOrCreateMeditation = require("../../handler/modules/findOrCreateMeditation");

async function createMeditation(req, res, next){
    const { meditation } = req.body;
    try {
        const newMeditation = await findOrCreateMeditation(meditation);
        if (!newMeditation?.error) res.status(200).json(newMeditation)
        else throw Error(newMeditation.error)
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
}

module.exports = createMeditation;