const createClass = require('./createClass');
const addVideoToClass = require('./addVideo');
const addPowerPointToClass = require('./addPowerPoint');
const getAllClasses = require('./getAllClasses');
const getClassById = require('./getClassById');
const deleteClass = require('./deleteClass');
const updateClass = require('./updateClass');
const addQuizToClass = require('./addQuizToClass');

module.exports = {
    createClass,
    addVideoToClass,
    addPowerPointToClass,
    addQuizToClass,
    getAllClasses,
    getClassById,
    deleteClass,
    updateClass
}