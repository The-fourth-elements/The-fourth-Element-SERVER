const mongoose = require('mongoose');

const DB_URI_TEST = require('./templates/URItest');
const { individualUserTest, testingUsers } = require('./templates/user');
const { testCity, testModule, testNationality, testProgress, testRole, testStatus } = require('./templates/models');

const { Users, regexPass } = require('../src/models/Users');
const City = require('../src/models/City');
const Module = require('../src/models/Module');

beforeAll(async()=>{
    await mongoose.connect(DB_URI_TEST);
});

beforeEach(async() => { 
    await Users.deleteMany({});
    await City.deleteMany({});
    await Module.deleteMany({});
});

describe("Data Base Modules Test", () => {
    describe("City Model", () => {
        it('Insert a City', async() =>{
            await City.create(testCity);
            const newUser = await Users.create(individualUserTest);
            const foundCity = (await City.find()).map(city => city.name)
            const foundUser = await Users.findById(newUser._id).populate('city');
            expect(foundCity).toContain(foundUser.city);
        });
    })

    describe("Module Model. Verify if: ", () => {
        beforeEach(async() => {
            await Module.create(testModule);
            await Users.insertMany(testingUsers);
        });

        it('Insert a Module name', async() => {
            const moduleNames = [];
            (await Users.find()).map(user => user.module.map(mod => moduleNames.push(mod.name)))
            const foundModuleName = (await Module.find()).map(module => module.name);
            const userSet = new Set(moduleNames);
            expect(userSet).toContain(String(foundModuleName));
        });

        it('Insert a Module Description', async() => {
            const moduleDesc = [];
            (await Users.find()).map(user => user.module.map(mod => moduleDesc.push(mod.description)))
            const foundModuleDesc = (await Module.find()).map(module => module.description);
            const userSet = new Set(moduleDesc);
            expect(userSet).toContain(String(foundModuleDesc));
        });

        it('Module Quiz is right', async() => {
            const foundUser = (await Users.find())[0].module.map(mod => mod.quiz);
            const foundModuleQuiz = parseInt((await Module.find()).map(module => module.quiz));
            const userSet = new Set(foundUser.map(quiz => Number(quiz)));
            const numbSet = parseInt([...userSet]);
            expect(numbSet).toBe(foundModuleQuiz)
            
        });

        it('Module Video URL is right', async() => {
            const moduleVideo = [];
            
        })
    })
})

afterAll(async () => {
    await mongoose.connection.close();
});
