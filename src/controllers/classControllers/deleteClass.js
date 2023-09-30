const Class = require('../../models/Class')

async function deleteClass(req, res, next){
    try {
        const {id} = req.params
        if(!id) res.status(400).json({message: 'No se proporcionó un id'})

        const deletedClass = await Class.findByIdAndDelete(id)

        if(!deletedClass) res.status(400).json({message: 'Error al eliminar la clase'})

        res.status(200).json({message: 'Clase eliminada con éxito'})
    } catch (error) {
        next({ message: error.message, statusCode: 500 });
    }
}

module.exports = deleteClass