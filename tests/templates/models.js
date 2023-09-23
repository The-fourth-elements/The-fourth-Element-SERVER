const { Users } = require('../../src/models/Users');
const findOrCreateCity = require('../../src/handler/findOrCreateCity')
const findOrCreateNation = require('../../src/handler/findOrCreateNation');
const { encrypt } = require('../../src/services/crypt');
const mongoose = require('mongoose');

const testCity = "New York";

const randomID = new mongoose.Types.ObjectId();

const testModule = {
    name: "Module 1",
    description: "It's a module 1 of the course.",
    quiz: 3,
    video_url: "videoURL.com"
}

const createUser = async(user) =>{
    try {
        const city = await findOrCreateCity(user.city)
        const nation = await findOrCreateNation(user.nation)
        const password = await encrypt(user.password);

        if (!city && !nation) throw Error("City or nation can't be created or found");
        const newUser = await Users.create({...user, city: city._id, password: password, nation: nation._id});
        if (newUser){
            return newUser;
        } else throw Error('Could not create user.')
    } catch (error) {
        return ({message: error.message, statusCode: 400})
    }
}

const testnation = "UnitedState";

const testProgress = {
    certificated: false,
    module_state: "In course",
    assistance: 3
}

const testRole = {perimision: 1};

const testStatus = {
    state: true,
    starting_date: Date.now,
    ending_date: null
}

module.exports = {
    testCity,
    testModule,
    testnation,
    testProgress,
    testRole,
    testStatus,
    createUser,
    randomID
}