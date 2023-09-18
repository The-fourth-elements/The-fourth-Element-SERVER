const { Users } = require('../../src/models/Users');
const findOrCreateCity = require('../../src/handler/findOrCreateCity')
const findOrCreateNationality = require('../../src/handler/findOrCreateNationality')

const testCity = "NewYork";

const testModule = {
    name: "Module 1",
    description: "It's a module 1 of the course.",
    quiz: 3,
    video_url: "videoURL.com"
}

const createUser = async(user) =>{
    try {
        const city = await findOrCreateCity(user.city)
        const nationality = await findOrCreateNationality(user.nationality)

        if(!city && !nationality) throw Error("City or Nationality can't be created or found");
        
        const newUser = await Users.create({...user, city: city._id, nationality: nationality._id});
        return newUser;
    } catch (error) {
        return {error}
    }
}

const testNationality = "UnitedState";

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
    testNationality,
    testProgress,
    testRole,
    testStatus,
    createUser
}