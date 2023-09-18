const mongoose = require('mongoose');
require('dotenv').config();
const { DB_URI_TEST } = process.env
const { individualUserTest, testingUsers } = require('./templates/user');
const { testCity, testModule, testNationality, testProgress, testRole, testStatus, createUser } = require('./templates/models');
const findOrCreateCity = require('../src/handler/findOrCreateCity');
const findOrCreateNationality = require('../src/handler/findOrCreateNationality');

const { Users, regexPass } = require('../src/models/Users');
const City = require('../src/models/City');
const Module = require('../src/models/Module');
const Nationality = require('../src/models/Nationality');
const Role = require('../src/models/Role');
const Progress = require('../src/models/Progress');
const Status = require('../src/models/Status');

beforeAll(async()=>{
    await mongoose.connect(DB_URI_TEST);
});

describe("Data Base Modules Test", () => {
    describe("City Model", () => {
        it('Insert a City', async() =>{
            const createCity = (await findOrCreateCity(testCity)).name;
            const foundCity = String((await City.find()).map(city => city.name))
            expect(foundCity).toContain(createCity);
        });
    })

    describe("Nationality Model", () => {
        it('Insert a Nation', async() => {
            const createNation = (await findOrCreateNationality(testNationality)).name;
            const foundNation = String((await Nationality.find()).map(nation => nation.name));
            expect(foundNation).toContain(createNation);
        })
    })

    xdescribe("Module Model. Verify if: ", () => {
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
    await Users.deleteMany({});
    await City.deleteMany({});
    await Module.deleteMany({});
    await Nationality.deleteMany({});
    await Role.deleteMany({});
    await Progress.deleteMany({});
    await Status.deleteMany({});
    await mongoose.connection.close();
});
