const { Users } = require('../../models/Users')

async function contarUsuariosPorPais(req, res) {
    try {
        const usuariosPorPais = await Users.aggregate([
            {
                $lookup: {
                    from: 'nations',
                    localField: 'nation',
                    foreignField: '_id',
                    as: 'userNation',
                },
            },
            {
                $group: {
                    _id: '$userNation.name',
                    total: { $sum: 1 },
                },
            },
        ]);

        const conteoPorPais = {};

        usuariosPorPais.forEach((grupo) => {
            const nombrePais = grupo._id[0];
            if (nombrePais) {
                conteoPorPais[nombrePais] = grupo.total;
            }
        });

        res.json(conteoPorPais);
    } catch (error) {
        console.error('Error al contar usuarios por país', error);
        res.status(500).json({ error: 'Error al contar usuarios por país' });
    }
}



module.exports = contarUsuariosPorPais