require('dotenv').config();
const mongoose = require('mongoose')
const request = require('supertest');
const app = require('../src/app');
const { DB_URI } = process.env;

const agent = request(app);

describe("Back-End Routing Test", () => {
    beforeAll(async()=>{
      await mongoose.connect(DB_URI);
    })
    afterAll(async()=>{
      await mongoose.connection.close();
    })

    describe("GET /users", () =>{
        it("Reply with status: 200.", async () => {
            const response = await agent.get('/users').expect(200)
        });

        it("Reply with status 400.", async () => {
            const response = await agent.get("/users");
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("error");
        });
    })

    describe('POST /user', () => {
        it('Post (userCreateController)', async() => {
            const userTest = {
                "name":"user",
                "lastName":"test",
                "adress":"Test_adress",
                "city":2,
                "natinality":20,
                "module":[],
                "role":2,
                "progress":2,
                "status":true,
                "profile_img":"testimg.com",
                "email":"user@test.com",
                "password":"testpass123"
            }
            await agent
                .post('/user')
                .send(userTest)
                .expect(200)
                .expect('Content-Type', /application\/json/);
        })
    })
  });
  

  