const mongoose = require('mongoose');
require('dotenv').config();
const { DB_URI_TEST } = process.env
const { individualUserTest, testingUsers } = require('./templates/user');
const { testCity, testModule, testnation, testProgress, testRole, testStatus, createUser } = require('./templates/models');
const findOrCreateCity = require('../src/handler/dataBase/findOrCreateCity');
const findOrCreateNation = require('../src/handler/dataBase/findOrCreateNation');
const { isEmail, isURL, isAscii } = require('validator');

const { Users, regexPass } = require('../src/models/Users');
const { City, Module, Nation, Role, Progress, Status} = require('../src/handler/dataBase/handleModels') 

beforeAll(async()=>{
    await mongoose.connect(DB_URI_TEST);
});

xdescribe("Data Base Modules Test", () => {
    xdescribe("City Model", () => {
        it('Insert a City', async() =>{
            const createCity = (await findOrCreateCity(testCity)).name;
            const foundCity = String((await City.find()).map(city => city.name))
            expect(foundCity).toContain(createCity);
        });

        it('City saves in DB as ObjectId(string)', async() => {
            (await findOrCreateCity(testCity)).name;
            const foundCity = String((await City.find()).map(city => city._id))
            expect(typeof foundCity).toBe('string');    
        });

        it('Name must be an ASCII valid', async() =>{
            const createCity = (await findOrCreateCity(testCity))._id;
            const foundCity = (await City.findOne({_id: createCity._id})).name;
            expect(isAscii(foundCity)).toBeTruthy();
        });
    })

    xdescribe("Nation Model", () => {
        it('Insert a Nation', async() => {
            const createNation = (await findOrCreateNation(testnation)).name;
            const foundNation = String((await Nation.find()).map(nation => nation.name));
            expect(foundNation).toContain(createNation);
        });

        it('Nation saves in DB as ObjectId', async() => {
            (await findOrCreateNation(testnation)).name;
            const foundNation = String((await Nation.find()).map(nation => nation._id));
            expect(typeof foundNation).toBe('string');
        });

        it('Name must be an ASCII valid', async() =>{
            const createNation = (await findOrCreateNation(testnation))._id;
            const foundCity = (await Nation.findOne({_id: createNation._id})).name;
            expect(isAscii(foundCity)).toBeTruthy();
        });
    })

    xdescribe("Module Model. Verify if: ", () => {
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
    await Nation.deleteMany({});
    // await Role.deleteMany({});
    await Progress.deleteMany({});
    await mongoose.connection.close();
});
