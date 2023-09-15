require('dotenv').config();
const mongoose = require('mongoose')
const request = require('supertest');
const app = require('../src/app');
const Users = require('../src/models/Users');
const { DB_URI_TEST } = process.env;

const agent = request(app);
const testingUsers = [
    {
        "name":"user 1",
        "lastName":"test 1",
        "adress":"Test_adress 1",
        "city":1,
        "natinality":10,
        "module":[],
        "role":1,
        "progress":1,
        "status":true,
        "profile_img":"testimg1.com",
        "email":"user1@test.com",
        "password":"testpass1"
    },
    {
        "name":"user 2",
        "lastName":"test 2",
        "adress":"Test_adress 2",
        "city":2,
        "natinality":20,
        "module":[],
        "role":2,
        "progress":2,
        "status":true,
        "profile_img":"testimg2.com",
        "email":"user2@test.com",
        "password":"testpass2"
    }
];

beforeAll(async()=>{
    await mongoose.connect(DB_URI_TEST);
})

beforeEach(async() => { // Ejecuta antes de cada test
    await Users.deleteMany({}); // Elimina todos los usuarios de la DB
})

describe("Back-End Routing Test", () => {

    describe("GET /users", () =>{
        it("Should reply with status 200. Verify that the", async () => {
            await Users.insertMany(testingUsers);
            const response = await agent.get('/users');
            expect(response.body).toHaveLength(2);
        });

        it("Reply with status 400.", async () => {
            const response = await agent.get("/users");
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("error");
        });
        
    });

    describe("GET /user/:id", () =>{
        it("Reply with status 200.", async () => {
            const userTest = await Users.create(testingUsers[0]);
            console.log(userTest._id);
            const response = await agent.get(`/user?id=${userTest._id}`);
            expect(response.status).toBe(200);
        });

        it("Reply with status 400.", async () => {
            const response = await agent.get("/user");
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("error");
        });

    });

    describe('POST /user', () => {
        it('Post (userCreateController)', async() => {
            await agent
                .post('/user')
                .send(testingUsers[0])
                .expect(200)
                .expect('Content-Type', /application\/json/);
        })
    })
});

afterAll(async()=>{
    await mongoose.connection.close();
})
  

  