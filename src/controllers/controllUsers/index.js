const deleteUser = require('./deleteUser');
const getAllUsers = require('./getAllUsers');
const getUserById = require('./getUserById');
const updateUser = require('./updateUser');
const createUserWithBody = require('./createUserWithBody')
const loginUser = require('./loginUser')

module.exports = {
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
    createUserWithBody,
    loginUser
}