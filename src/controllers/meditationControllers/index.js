const createMeditation = require('./createMeditation');
const getAllMeditations = require('./getAllMeditations');
const getMeditationById = require('./getMeditationById');
const deleteMeditation = require('./deleteMeditation');
const updateMeditation = require('./updateMeditation');
const addMeditationToModuls = require('./addMeditationToModuls');

module.exports = {
    createMeditation,
    getAllMeditations,
    getMeditationById,
    deleteMeditation,
    updateMeditation,
    addMeditationToModuls
}