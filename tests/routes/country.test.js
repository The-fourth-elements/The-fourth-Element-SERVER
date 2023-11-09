const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const DB_URI_TEST = require('../templates/URItest');
const Country = require('../../src/models/Nation');
const { findOrCreateNation, testNation } = require('../templates/models');
const { regexStrings } = require('../../src/models/Users');

const agent = request(app);

beforeAll(async() => {
    await mongoose.connect(DB_URI_TEST);
});

beforeEach(async() => {
    await Country.deleteMany({});
});

describe("Back-End Country Routing Test", () => {
    describe("GET /countries", () => {
        describe("Should reply with status 200. Verify if: ", () => {
            beforeEach(async() => {
                await findOrCreateNation(testNation[0]);
                await findOrCreateNation(testNation[1]);
            });
            it ("Country exist.", async () =>{
                const response = await agent.get('/countries');
                expect(response.status).toBe(200);
            });
            it ("Have the right length.", async () =>{
                await findOrCreateNation(testNation[3]);
                const response = await agent.get('/countries');
                expect(response.body).toHaveLength(3);
            });
            it("Return an array of Country.", async () => {
                const response = await agent.get('/countries');
                const newCountry = (await Country.findOne({name: testNation[1]}))._doc;
                expect(response.body[1]).toHaveProperty('_id', newCountry._id.valueOf())
                expect(response.body[0]).toHaveProperty('name', testNation[0]);
                expect(response.body[1]).toHaveProperty('name', testNation[1]);
            });
        })

        it("Should reply with status 400", async() =>{
            const response = await agent.get("/countries");
            expect(response.status).toBeGreaterThanOrEqual(400);
            expect(response.body).toHaveProperty("error");
        });
    });

    describe("GET /country/id", () =>{
        describe("Should reply with status 200. Verify if: ", () =>{
            beforeEach(async() => {
                await findOrCreateNation(testNation[2]);
                await findOrCreateNation(testNation[3]);
            });

            it("Country exist.", async () => {
                const countryTest = (await Country.findOne({name: testNation[2]}))._doc;
                const response = await agent.get(`/country/${countryTest._id.valueOf()}`);
                expect(response.status).toBe(200);
            });

            it("Return an Object", async () => {
                const countryTest = (await Country.findOne({name: testNation[3]}))._doc;
                const response = await agent.get(`/country/${countryTest._id.valueOf()}`);
                expect(response.body).toHaveProperty("_id");
                expect(response.body).toHaveProperty("name");
                expect(response.body).not.toHaveProperty("date");
            });

            it("The Country is right.", async () => {
                const countryTest = (await Country.findOne({name: testNation[3]}))._doc;
                const response = await agent.get(`/country/${countryTest._id.valueOf()}`);
                expect(response.body.name).toBe(testNation[3]);
            });
            
            it("Have an valid name.", async () => {
                const countryTest = (await Country.findOne({name: testNation[3]}))._doc;
                const response = await agent.get(`/country/${countryTest._id.valueOf()}`);
                expect(response.body.name).toBe(testNation[3]);
                expect(response.body.name).toMatch(regexStrings);
            });
        });

        it("Should reply with status 400.", async () => {
            await Country.deleteMany({})
            const response = await agent.get(`/country/${new mongoose.Types.ObjectId()}`);
            expect(response.status).toBeGreaterThanOrEqual(400);
            expect(response).toHaveProperty("error");
        });
    });

    describe("GET /country?name", () =>{
        describe("Should reply with status 200. Verify if: ", () =>{
            beforeEach(async() => {
                await findOrCreateNation(testNation[1]);
                await findOrCreateNation(testNation[2]);
            });

            it("Country exist.", async () => {
                const countryTest = (await Country.findOne({name: testNation[2]}))._doc;
                const response = await agent.get(`/country?name=${countryTest.name}`);
                expect(response.status).toBe(200);
            });

            it("Return an Object", async () => {
                const countryTest = (await Country.findOne({name: testNation[1]}))._doc;
                const response = await agent.get(`/country?name=${countryTest.name}`);
                expect(response.body).toHaveProperty("_id");
                expect(response.body).toHaveProperty("name");
                expect(response.body).not.toHaveProperty("date");
            });

            it("The Country is right.", async () => {
                const countryTest = (await Country.findOne({name: testNation[1]}))._doc;
                const response = await agent.get(`/country?name=${countryTest.name}`);
                expect(response.body.name).toBe(testNation[1]);
            });
            
            it("Have an valid name.", async () => {
                const countryTest = (await Country.findOne({name: testNation[2]}))._doc;
                const response = await agent.get(`/country?name=${countryTest.name}`);
                expect(response.body.name).toBe(testNation[2]);
                expect(response.body.name).toMatch(regexStrings);
            });

            it("Have an valid ID.", async () => {
                const countryTest = (await Country.findOne({name: testNation[1]}))._doc;
                const response = await agent.get(`/country?name=${countryTest.name}`);
                expect(response.body._id).toBe(countryTest._id.valueOf());
            });
        });

        it("Should reply with status 400.", async () => {
            await Country.deleteMany({})
            const response = await agent.get(`/country?name=${testNation[1]}`);
            expect(response.status).toBeGreaterThanOrEqual(400);
            expect(response).toHaveProperty("error");
        });
    });
});

afterAll(async()=>{
    await Country.deleteMany({});
    await mongoose.connection.close();
});