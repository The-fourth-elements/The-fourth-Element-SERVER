const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const DB_URI_TEST = require('../templates/URItest');
const Sports = require('../../src/models/Sport');
const { findOrCreateSport, testSport } = require('../templates/models');
const { regexStrings } = require('../../src/models/Users');

const agent = request(app);

beforeAll(async() => {
    await mongoose.connect(DB_URI_TEST);
});

beforeEach(async() => {
    await Sports.deleteMany({});
});

describe("Back-End Sports Routing Test", () => {
    describe("GET /sports", () => {
        describe("Should reply with status 200. Verify if: ", () => {
            beforeEach(async() => {
                await findOrCreateSport(testSport[0]);
                await findOrCreateSport(testSport[1]);
            });
            it ("Sport exist.", async () =>{
                const response = await agent.get('/sports');
                expect(response.status).toBe(200);
            });
            it ("Have the right length.", async () =>{
                await findOrCreateSport(testSport[3]);
                const response = await agent.get('/sports');
                console.log(response.body.length);
                expect(response.body).toHaveLength(3);
            });
            it("Return an array of Sports.", async () => {
                const response = await agent.get('/sports');
                const newSports = await Sports.findOne({name: testSport[1]});
                console.log(newSports);
                expect(response.body[1]).toHaveProperty('_id', newSports._id.valueOf())
                expect(response.body[0]).toHaveProperty('name', testSport[0]);
                expect(response.body[1]).toHaveProperty('name', testSport[1]);
            });
        })

        it("Should reply with status 400", async() =>{
            const response = await agent.get("/sports");
            expect(response.status).toBeGreaterThanOrEqual(400);
            expect(response.body).toHaveProperty("error");
        });
    });

    describe("GET /sports/id", () =>{
        describe("Should reply with status 200. Verify if: ", () =>{
            beforeEach(async() => {
                await findOrCreateSport(testSport[2]);
                await findOrCreateSport(testSport[3]);
            });

            it("Sport exist.", async () => {
                const SportsTest = (await Sports.findOne({name: testSport[2]}))._doc;
                const response = await agent.get(`/sport/${SportsTest._id.valueOf()}`);
                expect(response.status).toBe(200);
            });

            it("Return an Object", async () => {
                const SportsTest = (await Sports.findOne({name: testSport[3]}))._doc;
                const response = await agent.get(`/sport/${SportsTest._id.valueOf()}`);
                expect(response.body).toHaveProperty("_id");
                expect(response.body).toHaveProperty("name");
                expect(response.body).not.toHaveProperty("date");
            });

            it("The Sports is right.", async () => {
                const SportsTest = (await Sports.findOne({name: testSport[3]}))._doc;
                const response = await agent.get(`/sport/${SportsTest._id.valueOf()}`);
                expect(response.body.name).toBe(testSport[3]);
            });
            
            it("Have an valid name.", async () => {
                const SportsTest = (await Sports.findOne({name: testSport[3]}))._doc;
                const response = await agent.get(`/sport/${SportsTest._id.valueOf()}`);
                expect(response.body.name).toBe(testSport[3]);
                expect(response.body.name).toMatch(regexStrings);
            });
        });

        it("Should reply with status 400.", async () => {
            await Sports.deleteMany({});
            const response = await agent.get(`/sport/${new mongoose.Types.ObjectId()}`);
            expect(response.status).toBeGreaterThanOrEqual(400);
            expect(response).toHaveProperty("error");
        });
    });

    describe("GET /sport?name", () =>{
        describe("Should reply with status 200. Verify if: ", () =>{
            beforeEach(async() => {
                await findOrCreateSport(testSport[1]);
                await findOrCreateSport(testSport[2]);
            });

            it("Sport exist.", async () => {
                const SportsTest = (await Sports.findOne({name: testSport[2]}))._doc;
                const response = await agent.get(`/sport?name=${SportsTest.name}`);
                expect(response.status).toBe(200);
            });

            it("Return an Object", async () => {
                const SportsTest = (await Sports.findOne({name: testSport[1]}))._doc;
                const response = await agent.get(`/sport?name=${SportsTest.name}`);
                expect(response.body).toHaveProperty("_id");
                expect(response.body).toHaveProperty("name");
                expect(response.body).not.toHaveProperty("date");
            });

            it("The Sports is right.", async () => {
                const SportsTest = (await Sports.findOne({name: testSport[1]}))._doc;
                const response = await agent.get(`/sport?name=${SportsTest.name}`);
                expect(response.body.name).toBe(testSport[1]);
            });
            
            it("Have an valid name.", async () => {
                const SportsTest = (await Sports.findOne({name: testSport[2]}))._doc;
                const response = await agent.get(`/sport?name=${SportsTest.name}`);
                expect(response.body.name).toBe(testSport[2]);
                expect(response.body.name).toMatch(regexStrings);
            });

            it("Have an valid ID.", async () => {
                const SportsTest = (await Sports.findOne({name: testSport[1]}))._doc;
                const response = await agent.get(`/sport?name=${SportsTest.name}`);
                expect(response.body._id).toBe(SportsTest._id.valueOf());
            });
        });

        it("Should reply with status 400.", async () => {
            await Sports.deleteMany({})
            const response = await agent.get(`/sport?name=${testSport[1]}`);
            expect(response.status).toBeGreaterThanOrEqual(400);
            expect(response).toHaveProperty("error");
        });
    });
});

afterAll(async()=>{
    await Sports.deleteMany({});
    await mongoose.connection.close();
});