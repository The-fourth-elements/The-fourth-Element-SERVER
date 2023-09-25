const LandingContent = require('../../models/LandingContent');

async function getLandingContent(req, res, next) {
    try {
        const { id } = req.body;
        if (!id) {
            next({message: 'id is invalid', statusCode: 401});
        } else {
            const content = await LandingContent.findOne({"_id": id});
            if (content){
                res.status(200).json(content);
            } else {
                throw Error(content.error);
            }
        }
    } catch (error) {
        next({message: error.message, statusCode: 404});
    }
}

module.exports = getLandingContent;