const mongoose = require('mongoose');
require('dotenv').config();
const { DB_URI_TEST } = process.env
const { individualUserTest, testingUsers } = require('./templates/user');
const { testCity, testModule, testNationality, testProgress, testRole, testStatus, createUser } = require('./templates/models');
const findOrCreateCity = require('../src/handler/findOrCreateCity');
const findOrCreateNationality = require('../src/handler/findOrCreateNationality');
const { isEmail, isURL, isAscii } = require('validator');

const { Users, regexPass } = require('../src/models/Users');
const { City, Module, Nationality, Role, Progress, Status} = require('../src/handler/handleModels') 

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

        it('City saves in DB as ObjectId(string)', async() => {
            (await findOrCreateCity(testCity)).name;
            const foundCity = String((await City.find()).map(city => city._id))
            expect(typeof foundCity).toBe('string');    
        })
    })

    describe("Nationality Model", () => {
        it('Insert a Nation', async() => {
            const createNation = (await findOrCreateNationality(testNationality)).name;
            const foundNation = String((await Nationality.find()).map(nation => nation.name));
            expect(foundNation).toContain(createNation);
        });

        it('Nation saves in DB as ObjectId', async() => {
            (await findOrCreateNationality(testNationality)).name;
            const foundNation = String((await Nationality.find()).map(nation => nation._id));
            expect(typeof foundNation).toBe('string');
        })
    })

    describe("Module Model. Verify if: ", () => {
        beforeEach(async() => {
            await Module.create(testModule);
            await createUser(testingUsers[0]);
            await createUser(testingUsers[1]);
        });

        it('Insert a Module name', async() => {
            const moduleNames = []; 
            (await Users.find({})).map(user => user.module.map(mod => moduleNames.push(mod.name)));
            const foundModuleName = (await Module.find()).map(module => module.name);
            const moduleSet = new Set(moduleNames);
            expect(moduleSet).toContain(String(foundModuleName));
        });

        it('Insert a Module Description', async() => {
            const moduleDesc = [];
            (await Users.find()).map(user => user.module.map(mod => moduleDesc.push(mod.description)))
            const foundModuleDesc = (await Module.findOne()).description;
            const userSet = new Set(moduleDesc);
            expect(userSet).toContain(foundModuleDesc);
        });

        it('Module Quiz is right', async() => {
            const foundUser = (await Users.find())[0].module.map(mod => mod.quiz);
            const foundModuleQuiz = parseInt((await Module.find()).map(module => module.quiz));
            const userSet = new Set(foundUser.map(quiz => Number(quiz)));
            const numbSet = parseInt([...userSet]);
            expect(numbSet).toBe(foundModuleQuiz);    
        });

        xit('Module Video URL is right', async() => {
            
        });
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
