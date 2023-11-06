const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const DB_URI_TEST = require('../templates/URItest');
const City = require('../../src/models/City');
const { findOrCreateCity, testCities } = require('../templates/models');
const { regexStrings } = require('../../src/models/Users');

const agent = request(app);

beforeAll(async() => {
    await mongoose.connect(DB_URI_TEST);
});

beforeEach(async() => {
    await City.deleteMany({});
});

describe("Back-End City Routing Test", () => {
    describe("GET /cities", () => {
        describe("Should reply with status 200. Verify if: ", () => {
            beforeEach(async() => {
                await findOrCreateCity(testCities[0]);
                await findOrCreateCity(testCities[1]);
            });
            it ("Cities exist.", async () =>{
                const response = await agent.get('/cities');
                expect(response.status).toBe(200);
            });
            it ("Have the right length.", async () =>{
                await findOrCreateCity(testCities[3]);
                const response = await agent.get('/cities');
                expect(response.body).toHaveLength(3);
            });
            it("Return an array of Cities.", async () => {
                const response = await agent.get('/cities');
                const newCity = (await City.findOne({name: testCities[1]}))._doc;
                expect(response.body[1]).toHaveProperty('_id', newCity._id.valueOf())
                expect(response.body[0]).toHaveProperty('name', testCities[0]);
                expect(response.body[1]).toHaveProperty('name', testCities[1]);
            });
        })

        it("Should reply with status 400", async() =>{
            const response = await agent.get("/cities");
            expect(response.status).toBeGreaterThanOrEqual(400);
            expect(response.body).toHaveProperty("error");
        });
    });

    describe("GET /city/id", () =>{
        describe("Should reply with status 200. Verify if: ", () =>{
            beforeEach(async() => {
                await findOrCreateCity(testCities[2]);
                await findOrCreateCity(testCities[3]);
            });

            it("City exist.", async () => {
                const cityTest = (await City.findOne({name: testCities[2]}))._doc;
                const response = await agent.get(`/city/${cityTest._id.valueOf()}`);
                expect(response.status).toBe(200);
            });

            it("Return an Object", async () => {
                const cityTest = (await City.findOne({name: testCities[3]}))._doc;
                const response = await agent.get(`/city/${cityTest._id.valueOf()}`);
                expect(response.body).toHaveProperty("_id");
                expect(response.body).toHaveProperty("name");
                expect(response.body).not.toHaveProperty("date");
            });

            it("The city is right.", async () => {
                const cityTest = (await City.findOne({name: testCities[3]}))._doc;
                const response = await agent.get(`/city/${cityTest._id.valueOf()}`);
                expect(response.body.name).toBe(testCities[3]);
            });
            
            it("Have an valid name.", async () => {
                const cityTest = (await City.findOne({name: testCities[3]}))._doc;
                const response = await agent.get(`/city/${cityTest._id.valueOf()}`);
                expect(response.body.name).toBe(testCities[3]);
                expect(response.body.name).toMatch(regexStrings);
            });
        });

        it("Should reply with status 400.", async () => {
            await City.deleteMany({})
            const response = await agent.get(`/city/${new mongoose.Types.ObjectId()}`);
            expect(response.status).toBeGreaterThanOrEqual(400);
            expect(response).toHaveProperty("error");
        });
    });

    describe("GET /user?name", () =>{
        describe("Should reply with status 200. Verify if: ", () =>{
            beforeEach(async() => {
                await findOrCreateCity(testCities[1]);
                await findOrCreateCity(testCities[2]);
            });

            it("City exist.", async () => {
                const cityTest = (await City.findOne({name: testCities[2]}))._doc;
                const response = await agent.get(`/city?name=${cityTest.name}`);
                expect(response.status).toBe(200);
            });

            it("Return an Object", async () => {
                const cityTest = (await City.findOne({name: testCities[1]}))._doc;
                const response = await agent.get(`/city?name=${cityTest.name}`);
                expect(response.body).toHaveProperty("_id");
                expect(response.body).toHaveProperty("name");
                expect(response.body).not.toHaveProperty("date");
            });

            it("The city is right.", async () => {
                const cityTest = (await City.findOne({name: testCities[1]}))._doc;
                const response = await agent.get(`/city?name=${cityTest.name}`);
                expect(response.body.name).toBe(testCities[1]);
            });
            
            it("Have an valid name.", async () => {
                const cityTest = (await City.findOne({name: testCities[2]}))._doc;
                const response = await agent.get(`/city?name=${cityTest.name}`);
                expect(response.body.name).toBe(testCities[2]);
                expect(response.body.name).toMatch(regexStrings);
            });

            it("Have an valid ID.", async () => {
                const cityTest = (await City.findOne({name: testCities[1]}))._doc;
                const response = await agent.get(`/city?name=${cityTest.name}`);
                expect(response.body._id).toBe(cityTest._id.valueOf());
            });
        });

        it("Should reply with status 400.", async () => {
            await City.deleteMany({})
            const response = await agent.get(`/city/${testCities[1]}`);
            expect(response.status).toBeGreaterThanOrEqual(400);
            expect(response).toHaveProperty("error");
        });
    });
});

afterAll(async()=>{
    await City.deleteMany({});
    await mongoose.connection.close();
});