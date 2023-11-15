const mongoose = require('mongoose');
const { Users } = require('../../src/models/Users');
const { encrypt } = require('../../src/services/crypt');
const findOrCreateCity = require('../../src/handler/dataBase/findOrCreateCity')
const findOrCreateNation = require('../../src/handler/dataBase/findOrCreateNation');
const findOrCreateSport = require('../../src/handler/dataBase/findOrCreateSport');

const testCities = ["New York", "Buenos Aires", "Madrid", "Seatle"];

const testSport = ["Futbol", "Voleyball", "Rugby", "Handball"];

const randomID = new mongoose.Types.ObjectId();

const testModule = {
    name: "Module 1",
    description: "It's a module 1 of the course.",
    quiz: 3,
    video_url: "videoURL.com"
}

const createUser = async(user) =>{
    try {
        const city = await findOrCreateCity(user.city);
        const nationality = await findOrCreateNation(user.nationality);
        const sport = await findOrCreateSport(user.sport);
        const password = await encrypt(user.password);

        if (!city && !nationality) throw Error("City or nation can't be created or found");
        const newUser = await Users.create({
            ...user, 
            city: city, 
            password: password, 
            nation: nationality,
            sport: sport
        });
        if (newUser){
            return newUser;
        } else throw Error('Could not create user.')
    } catch (error) {
        return ({message: error.message, statusCode: 400})
    }
}

const testNation = ["United State", "Mónaco", "Argentina", "Japón", "Australia", "South Africa"];

const testProgress = {
    certificated: false,
    module_state: "In course",
    assistance: 3
}

const testRole = { role: 1 };

const testStatus = {
    state: true,
    starting_date: Date.now,
    ending_date: null
}

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

module.exports = {
    testCities,
    testModule,
    testNation,
    testProgress,
    testRole,
    testStatus,
    createUser,
    randomID,
    testSport,
    findOrCreateCity,
    findOrCreateNation,
    findOrCreateSport,
    emailRegex
}