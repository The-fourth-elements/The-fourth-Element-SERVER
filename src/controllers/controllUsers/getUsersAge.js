const { Users } = require('../../models/Users.js');

async function getUsersAge(req, res, next) {
    try {
        const ageRanges = [
            { min: 1, max: 18 },
            { min: 19, max: 26 },
            { min: 27, max: 30 },
            { min: 31, max: 40 },
            { min: 41, max: 120 },
        ];

        const counts = await Promise.all(
            ageRanges.map(async (range) => {
                const count = await Users.countDocuments({ age: { $gte: range.min, $lte: range.max } });
                return { range, count };
            })
        );

        return res.status(200).json(counts);
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
}

module.exports = getUsersAge;