const Quest = require("../../models/Quest");

async function deleteQuest (req, res, next){
    try {
        const { id } = req.params;
        if(!id) throw Error('Ingrese un ID');
        const questDelete = await Quest.findByIdAndDelete(id);
        if(!questDelete) throw Error('Pregunta no encontrada');
        return res.status(200).json({ message: "Pregunta borrada con exito" });
    } catch (error) {
        next({ message: error.message, statusCode: 400});
    }
};

module.exports = deleteQuest;