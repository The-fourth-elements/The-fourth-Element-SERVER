const { Users } = require('../../models/Users');

async function getAllUsersSports(req, res, next) {
    try {
        const usuariosPorDeporte = await Users.aggregate([
            {
                $lookup: {
                    from: 'sports',
                    localField: 'sport',
                    foreignField: '_id',
                    as: 'userSport',
                },
            },
            {
                $unwind: '$userSport',
            },
            {
                $group: {
                    _id: '$userSport.name',
                    total: { $sum: 1 },
                },
            },
        ]);

        const conteoPorDeporte = {};

        usuariosPorDeporte.forEach((grupo) => {
            const nombreDeporte = grupo._id;
            if (nombreDeporte) {
                conteoPorDeporte[nombreDeporte] = grupo.total;
            }
        });

        res.json(conteoPorDeporte);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = getAllUsersSports;
