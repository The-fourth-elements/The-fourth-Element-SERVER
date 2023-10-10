const deleteUser = require('./deleteUser');
const getAllUsers = require('./getAllUsers');
const getUserById = require('./getUserById');
const updateUser = require('./updateUser');
const getAllUsersDeleted = require('./getAllUsersDeleted');
const getUserReset = require('./getUserReset');
const createUserWithBody = require('./createUserWithBody');
const loginUser = require('./loginUser');
const getUserByEmail = require('./getUserByEmail');
const getAllUsersAge = require('./getAllUsersAge');
const getUsersAge = require('./getUsersAge');

module.exports = {
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
    getAllUsersDeleted,
    getUserReset,
    createUserWithBody,
    loginUser,
    getUserByEmail,
    getAllUsersAge,
    getUsersAge
}