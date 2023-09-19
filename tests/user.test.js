const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');
const { Users, regexPass } = require('../src/models/Users');
const DB_URI_TEST = require('./templates/URItest');
const { individualUserTest, testingUsers } = require('./templates/user');
const { encrypt } = require('../src/services/crypt');

const agent = request(app);

beforeAll(async()=>{
    await mongoose.connect(DB_URI_TEST);
});

beforeEach(async() => { // Ejecuta antes de cada test
    await Users.deleteMany({}); // Elimina todos los usuarios de la DB
});

describe("Back-End Routing Test", () => {
    describe("GET /users", () =>{
        describe("Should reply with status 200. Verify if: ", () => {
            beforeEach(async() => {
                await agent.post('/user').send(testingUsers[0]);
                await agent.post('/user').send(testingUsers[1]);
            });
            
            it("Users exist", async () => {
                const response = await agent.get('/users');
                expect(response.status).toBe(200);
            });

            it("Have the right lenght", async () => {
                await agent.post('/user').send(individualUserTest);
                const response = await agent.get('/users');
                expect(response.body).toHaveLength(testingUsers.length + 1);
            });

            it("Return an array.", async () => {
                const response = await agent.get('/users');
                const newUser = await Users.findOne({email: testingUsers[0].email})
                const dbUserId = newUser._id.toString();
                expect(response.body[0]).toMatchObject({
                    ...testingUsers[0],
                    password: newUser.password,
                    city: newUser.city.valueOf(),
                    nationality: newUser.nationality.valueOf(),
                    _id: dbUserId,
                    __v: newUser.__v,
                  });
            });
        });
        
        it("Should reply with status 400.", async () => {
            await Users.deleteMany({});
            const response = await agent.get("/users");
            expect(response.status).toBeGreaterThan(400);
            expect(response.body).toHaveProperty("error");
        }); 
    });

    describe("GET /user/:id", () =>{
        describe("Should reply with status 200. Verify if: ", () =>{
            beforeEach(async() => {
                await agent.post('/user').send(testingUsers[0]);
                await agent.post('/user').send(testingUsers[1]);
            });

            it("User exist.", async () => {
                const userTest = await Users.findOne({name: testingUsers[0].name});
                const response = await agent.get(`/user?id=${userTest._id}`);
                expect(response.status).toBe(200);
            });

            it("Return an Object", async () => {
                const userTest = await Users.findOne({name: testingUsers[0].name});
                const response = await agent.get(`/user?id=${userTest._id}`);
                expect(response.body).toHaveProperty("name");
                expect(response.body).toHaveProperty("email");
                expect(response.body).toHaveProperty("password");
            });

            it("The name is right.", async () => {
                const userTest = await Users.findOne({name: testingUsers[0].name});
                const response = await agent.get(`/user?id=${userTest._id}`);
                expect(response.body.name).toBe(testingUsers[0].name);
            });
            
            it("Have an valid email.", async () => {
                const userTest = await Users.findOne({name: testingUsers[1].name});
                const response = await agent.get(`/user?id=${userTest._id}`);
                expect(response.body.email).toMatch(testingUsers[1].email);
            });

            it("Have a password.", async () => {
                const response = await agent.get('/users');
                expect(response.body[1]).toHaveProperty("password");
                expect(response.body[1].password).toMatch(regexPass);
            });
        });

        it("Should reply with status 400.", async () => {
            const response = await agent.get("/user");
            expect(response.status).toBeGreaterThan(400);
            expect(response.body).toHaveProperty("error");
        });
        
    });

    describe('POST /user', () => {
        beforeAll(async() => {
            await Users.deleteMany({});
        })
        describe("Should reply with status 200. Verify if: ", () => {
            it('The post was successful', async() => {
                await agent.post('/user')
                    .send(individualUserTest)
                    .expect(200);
            });

            it('The Content-Type is an JSON Aplication', async() => {
                await agent
                    .post('/user')
                    .send(individualUserTest)
                    .expect('Content-Type', /application\/json/);
            });

            it('User created match with user in DB', async() => {
                await agent.post('/user').send(individualUserTest);
                const matchedUser = await agent.get(`/users`);
                const dbUser = await Users.find({name: individualUserTest.name})
                const matchedUserId = matchedUser.body[0]._id.toString();
                const dbUserId = dbUser[0]._id.toString();
                expect(matchedUserId).toEqual(dbUserId);
            });
        });

        it('Should reply with status 400.', async() => {
            const response = await agent.post('/user').send();
            expect(response.status).toBe(400);
        });
    })

    describe('POST /login', () => {
        beforeEach(async() => {
            await agent.post('/user').send(testingUsers[1]);
        });
        describe("Should reply with status 200. Verify if: ", () => {
            it('Post (userCreateController)', async() => {
                await agent
                    .post('/login')
                    .send({email: testingUsers[1].email, password: testingUsers[1].password})
                    .expect(200);
            });

            it('The Content-Type is an JSON Aplication', async() => {
                await agent
                    .post('/user')
                    .send(individualUserTest)
                    .expect('Content-Type', /application\/json/);
            });

            it('User can loggin', async() => {
                const matchedUser = await agent.get(`/users`);
                const dbUser = await Users.find({name: testingUsers[1].name})
                const matchedUserId = matchedUser.body[0]._id.toString();
                const dbUserId = dbUser[0]._id.toString();
                expect(matchedUserId).toEqual(dbUserId);
            });
        });
        
        it('Should reply with status 400.', async() => {
            const response = await agent.post('/login').send({email: testingUsers[0].email, password: testingUsers[1].password});
            expect(response.status).toBeGreaterThan(400);
        });
    });
});

afterAll(async()=>{
    await Users.deleteMany({});
    await mongoose.connection.close();
});