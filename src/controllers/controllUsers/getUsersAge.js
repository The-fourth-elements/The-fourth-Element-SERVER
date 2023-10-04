const { Users } = require('../../models/Users');

async function getUsersAge(req, res, next) {
    try {
        const users = await Users.find({});
        if (!users) throw Error('No hay usuarios');

        const ageCategories = {
            menor18: 0,
            menor26: 0,
            menor30: 0,
            menor40: 0,
            menor120: 0,
        };

        users.forEach((user) => {
            if (user.age >= 1 && user.age <= 18) ageCategories.menor18++;
            else if (user.age > 18 && user.age <= 26) ageCategories.menor26++;
            else if (user.age > 26 && user.age <= 30) ageCategories.menor30++;
            else if (user.age > 30 && user.age <= 40) ageCategories.menor40++;
            else if (user.age > 40 && user.age <= 120) ageCategories.menor120++;
        });

        const totalUsers = users.length;
        const totalAge = users.reduce((sum, user) => sum + user.age, 0);
        const averageAge = totalAge / totalUsers;

        const result = {
            ...ageCategories,
            promedioEdad: averageAge,
        };

        return res.status(200).json(result);
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
}

module.exports = getUsersAge;
