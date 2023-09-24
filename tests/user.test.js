const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');
const { Users, regexPass } = require('../src/models/Users');
const DB_URI_TEST = require('./templates/URItest');
const { individualUserTest, testingUsers } = require('./templates/user');
const { createUser, randomID } = require('./templates/models');

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
                    nation: newUser.nation.valueOf(),
                    _id: dbUserId,
                    __v: newUser.__v,
                  });
            });
        });
        
        it("Should reply with status 400.", async () => {
            await Users.deleteMany({});
            const response = await agent.get("/users");
            expect(response.status).toBeGreaterThanOrEqual(400);
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
            expect(response.status).toBeGreaterThanOrEqual(400);
            expect(response.body).toHaveProperty("error");
        });
        
    });

    describe('PUT /user', () => {
        beforeEach(async() => {
            await createUser(individualUserTest);
            await createUser(testingUsers[1]);
        });
        describe("Should reply with status 200. Verify if: ", () =>{
            it('The update was successful.', async() =>{
                const findUser = await Users.findOne({email: individualUserTest.email});
                const newIndividualUserTest = {id: findUser._id.valueOf(), name: "TestName"};
                await agent.put('/user')
                    .send(newIndividualUserTest)
                    .expect(200);
            });

            it('Can update a name.', async() => {
                const findUserId = (await Users.findOne({email: individualUserTest.email}))._id;
                const findUsers = (await Users.find()).map(user => user.name);
                const newIndividualUserTest = {id: findUserId, name: "TestName"};
                const response = await agent.put('/user').send(newIndividualUserTest);
                expect(findUsers).not.toContain(response.body.name);
                expect(newIndividualUserTest.name).toBe(response.body.name);
            });

            it('Can update a lastName.', async() => {
                const findUserId = (await Users.findOne({email: individualUserTest.email}))._id;
                const findUsers = (await Users.find()).map(user => user.lastName);
                const newIndividualUserTest = {id: findUserId, lastName: "lastnameTest"};
                const response = await agent.put('/user').send(newIndividualUserTest);
                expect(findUsers).not.toContain(response.body.lastName);
                expect(newIndividualUserTest.lastName).toBe(response.body.lastName);
            });

            it('Can update a email.', async() => {
                const findUserId = (await Users.findOne({email: individualUserTest.email}))._id;
                const findUsers = (await Users.find()).map(user => user.email);
                const newIndividualUserTest = {id: findUserId, email: "testmail@mess.com"};
                const response = await agent.put('/user').send(newIndividualUserTest);
                expect(findUsers).not.toContain(response.body.email);
                expect(newIndividualUserTest.email).toBe(response.body.email);
            });
        });

        it('Should reply with status 400.', async() => {
            const newIndividualUserTest = {id: "", email: "testmail@mess.com"};
            const response = await agent.put('/user').send(newIndividualUserTest);
            expect(response.status).toBeGreaterThanOrEqual(400);
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
            expect(response.status).toBeGreaterThanOrEqual(400);
        });
    })

    describe('DELETE /user', () => {
        beforeEach(async() => {
            await createUser(individualUserTest);
            await createUser(testingUsers[1]);
        });
        describe("Should reply with status 200. Verify if: ", () =>{
            it('User delete successful.', async() =>{
                const findUser = await Users.findOne({email: individualUserTest.email});
                await agent.delete(`/user/${findUser._id}`)
                    .expect(200);
            });

            it('User cannot be accesible.', async() =>{
                const findUser = await Users.findOne({email: individualUserTest.email});
                await agent.delete(`/user/${findUser._id}`).expect(200);
                const allUsersDB = await Users.find();
                expect(allUsersDB).not.toContain(findUser);
            });
        });

        it('Should reply with status 400.', async() => {
            const response = await agent.delete(`/user/${randomID.valueOf()}`);
            expect(response.status).toBeGreaterThanOrEqual(400);
        });
    });

    describe('POST /login', () => {
        beforeEach(async() => {
            await createUser(testingUsers[1]);
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
            expect(response.status).toBeGreaterThanOrEqual(400);
        });
    });
});

afterAll(async()=>{
    await Users.deleteMany({});
    await mongoose.connection.close();
});