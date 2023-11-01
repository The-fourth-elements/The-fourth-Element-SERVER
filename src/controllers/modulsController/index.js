const updateController = require('./uppdateController');
const deleteController = require('./deleteController');
const createController = require('./createController');
const addClassToModule = require('./addClassToModule');
const getAllModules = require('./getAllModules');
const getModuleById = require('./getModuleById');
const addQuizToModule = require('./addQuizToModule');
const addExerciseToModule = require('./addExerciseToModule');
const addMeditationToModule = require('./addMeditationToModule');
const addSelfRegisterToModule = require('./addSelfRegisterToModule');

module.exports = {
    updateController,
    deleteController,
    createController,
    addClassToModule,
    getAllModules,
    getModuleById,
    addQuizToModule,
    addExerciseToModule,
    addMeditationToModule,
    addSelfRegisterToModule
}