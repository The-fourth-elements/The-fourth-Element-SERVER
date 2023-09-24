const Module = require('../../models/Module');

const deleteContent = async (req, res, next) => {
    try {
        const { id } = req.params;
        if(!id) throw Error('Empty content, or id undefined');
        await Module.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
};


module.exports = deleteContent;