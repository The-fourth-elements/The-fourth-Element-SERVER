const mongoose = require('mongoose');
require('dotenv').config();
const { DB_URI_TEST } = process.env
const { individualUserTest, testingUsers } = require('../templates/user');
const { testCity, testModule, testNation, testProgress, testRole, testStatus, createUser, testSport } = require('../templates/models');
const findOrCreateCity = require('../../src/handler/dataBase/findOrCreateCity');
const findOrCreateNation = require('../../src/handler/dataBase/findOrCreateNation');
const { isEmail, isURL, isAscii } = require('validator');

const { Users, regexPass } = require('../../src/models/Users');
const { City, Module, Nation, Role, Progress, Status} = require('../../src/handler/dataBase/handleModels'); 
const findOrCreateSport = require('../../src/handler/dataBase/findOrCreateSport');
const Sport = require('../../src/models/Sport');

beforeAll(async()=>{
    await mongoose.connect(DB_URI_TEST);
});

describe("Data Base Modules Test", () => {
    describe("City Model", () => {
        it('Insert a City', async() =>{
            const createCity = (await findOrCreateCity(testCity)).name;
            const foundCity = (await City.find()).map(city => city.name);
            expect(foundCity).toContain(createCity);
        });

        it('City saves in DB as ObjectId(string)', async() => {
            await findOrCreateNation(testCity);
            const foundCity = (await City.find()).map(city => city._doc);
            expect(foundCity[0]).toHaveProperty('_id');
            expect(foundCity[0]).toHaveProperty('name');
            expect(typeof foundCity[0]._id.valueOf()).toBe('string');   
        });

        it('Name must be an ASCII valid', async() =>{
            const createCity = (await findOrCreateCity(testCity))._id;
            const foundCity = (await City.findOne({_id: createCity._id})).name;
            expect(isAscii(foundCity)).toBeTruthy();
        });
    });

    describe("Nation Model", () => {
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

    describe("Sport Model", () => {
        it('Insert a Sport', async() => {
            const createSport = (await findOrCreateSport(testSport)).name;
            const foundSport = (await Sport.find()).map(sport => sport.name);
            expect(foundSport).toContain(createSport);
        });

        it('Nation saves in DB as ObjectId', async() => {
            await findOrCreateSport(testSport);
            const foundSport = (await Sport.find()).map(sport => sport._doc);
            expect(foundSport[0]).toHaveProperty('_id');
            expect(foundSport[0]).toHaveProperty('name');
            expect(typeof foundSport[0]._id.valueOf()).toBe('string');
        });

        it('Name must be an ASCII valid', async() =>{
            await findOrCreateNation(testSport);
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
