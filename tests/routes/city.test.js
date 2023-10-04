const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const DB_URI_TEST = require('../templates/URItest');
const City = require('../../src/models/City');

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
            beforeAll(async() => {
                
            });
            it ("The response is an array of cities.", async () =>{

            });
        })

        it("Should reply with status 400", async() =>{
            const response = await agent.get("/cities");
            expect(response.status).toBeGreaterThanOrEqual(400);
            expect(response.body).toHaveProperty("error");
        });
    });
});

afterAll(async()=>{
    await City.deleteMany({});
    await mongoose.connection.close();
});