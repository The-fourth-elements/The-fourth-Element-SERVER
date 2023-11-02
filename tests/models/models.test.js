const mongoose = require('mongoose');
require('dotenv').config();
const { DB_URI_TEST } = process.env
const { individualUserTest, testingUsers } = require('../templates/user');
const { testCities, testModule, testNation, testSport, createUser, findOrCreateCity, findOrCreateNation, findOrCreateSport } = require('../templates/models');
const { isEmail, isURL, isAscii } = require('validator');
const { regexPass } = require('../../src/models/Users');
const { Users, City, Module, Nation, Role, Progress, Sport } = require('../../src/handler/dataBase/handleModels');

beforeAll(async()=>{
    await mongoose.connect(DB_URI_TEST);
});

describe('Data Base Modules Test', () => {

    describe('User Model', () => {

        afterEach(async() => {
            await Users.deleteMany({});
        })

        it('Insert a User', async() => {
            await createUser(individualUserTest);
            const foundUser = await Users.findOne({ email: individualUserTest.email});
            expect(foundUser).toHaveProperty('username')
            expect(foundUser).toHaveProperty('role')
            expect(foundUser).toHaveProperty('email')
            expect(foundUser).toHaveProperty('password')
        });

        it('Verify if User have default properties and match with User in DB', async() => {
            const newUser = await createUser(individualUserTest);
            const foundUser = await Users.findOne({ email: individualUserTest.email});
            expect(newUser).toHaveProperty('_id', foundUser._id);
            expect(newUser).toHaveProperty('username', foundUser.username);
            expect(newUser).toHaveProperty('email', foundUser.email);
            expect(newUser).toHaveProperty('nation');
            expect(newUser).toHaveProperty('sport');
            expect(newUser).toHaveProperty('city');
            expect(newUser).toHaveProperty('role', foundUser.role);
            expect(newUser).toHaveProperty('age', foundUser.age);
            expect(newUser).toHaveProperty('expYearsSports', foundUser.expYearsSports);
        });
    });

    describe('City Model', () => {
        it('Insert a City', async() =>{
            const createCity = (await findOrCreateCity(testCities[0])).name;
            const foundCity = (await City.find()).map(city => city.name);
            expect(foundCity).toContain(createCity);
        });

        it('City saves in DB as ObjectId', async() => {
            await findOrCreateCity(testCities[0]);
            const foundCity = (await City.find()).map(city => city._doc);
            expect(foundCity[0]).toHaveProperty('_id');
            expect(foundCity[0]).toHaveProperty('name');
            expect(typeof foundCity[0]._id.valueOf()).toBe('string');   
        });

        it('Name must be an ASCII valid', async() =>{
            const createCity = (await findOrCreateCity(testCities[0]))._id;
            const foundCity = (await City.findOne({_id: createCity._id})).name;
            expect(isAscii(foundCity)).toBeTruthy();
        });
    });

    describe('Nation Model', () => {
        it('Insert a Nation', async() => {
            const createNation = (await findOrCreateNation(testNation)).name;
            const foundNation = (await Nation.find()).map(nation => nation.name);
            expect(foundNation).toContain(createNation);
        });

        it('Nation saves in DB as ObjectId', async() => {
            await findOrCreateNation(testNation);
            const foundNation = (await Nation.find()).map(nation => nation._doc);
            expect(foundNation[0]).toHaveProperty('_id');
            expect(foundNation[0]).toHaveProperty('name');
            expect(typeof foundNation[0]._id.valueOf()).toBe('string');
        });

        it('Name must be an ASCII valid', async() =>{
            const createNation = (await findOrCreateNation(testNation))._id;
            const foundNation = (await Nation.findOne({_id: createNation})).name;
            expect(isAscii(foundNation)).toBeTruthy();
        });
    });

    describe('Sport Model', () => {
        it('Insert a Sport', async() => {
            const createSport = (await findOrCreateSport(testSport)).name;
            const foundSport = (await Sport.find()).map(sport => sport.name);
            expect(foundSport).toContain(createSport);
        });

        it('Sport saves in DB as ObjectId', async() => {
            await findOrCreateSport(testSport);
            const foundSport = (await Sport.find()).map(sport => sport._doc);
            expect(foundSport[0]).toHaveProperty('_id');
            expect(foundSport[0]).toHaveProperty('name');
            expect(typeof foundSport[0]._id.valueOf()).toBe('string');
        });

        it('Name must be an ASCII valid', async() =>{
            await findOrCreateSport(testSport);
            const foundSport = (await Sport.find()).map(sport => sport.name);
            expect(isAscii(foundSport[0])).toBeTruthy();
        });
    });
})

afterAll(async () => {
    await Users.deleteMany({});
    await City.deleteMany({});
    await Module.deleteMany({});
    await Nation.deleteMany({});
    await Sport.deleteMany({});
    // await Role.deleteMany({});
    await Progress.deleteMany({});
    await mongoose.connection.close();
});
