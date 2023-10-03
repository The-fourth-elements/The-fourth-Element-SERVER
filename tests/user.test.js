const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');
const { Users } = require('../src/models/Users');
const DB_URI_TEST = require('./templates/URItest');
const { individualUserTest, testingUsers } = require('./templates/user');
const { createUser, randomID } = require('./templates/models');
const { compare } = require('bcrypt');

const agent = request(app);

beforeAll(async()=>{
    await mongoose.connect(DB_URI_TEST);
});

beforeEach(async() => { // Ejecuta antes de cada test
    await Users.deleteMany({}); // Elimina todos los usuarios de la DB
});

describe("Back-End Routing Test", () => {
    xdescribe("GET /users", () =>{
        xdescribe("Should reply with status 200. Verify if: ", () => {
            beforeEach(async() => {
                await agent.post('/auth').send(testingUsers[0]);
                await agent.post('/auth').send(testingUsers[1]);
            });
            
            it("Users exist", async () => {
                const response = await agent.get('/users');
                expect(response.status).toBe(200);
            });

            it("Have the right lenght", async () => {
                await agent.post("/auth").send(individualUserTest);
                const response = await agent.get('/users');
                expect(response.body).toHaveLength(testingUsers.length + 1);
            });

            it("Return an array.", async () => {
                const response = await agent.get('/users');
                const newUser = (await Users.findOne({email: testingUsers[0].email}))._doc
                const dbUserId = newUser._id.toString();
                expect(response.body[0]).toMatchObject({
                    password: newUser.password,
                    city: newUser.city.valueOf(),
                    nation: newUser.nation.valueOf(),
                    _id: dbUserId,
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

    xdescribe("GET /user?id", () =>{
        xdescribe("Should reply with status 200. Verify if: ", () =>{
            beforeEach(async() => {
                await agent.post("/auth").send(testingUsers[0]);
                await agent.post("/auth").send(testingUsers[1]);
            });

            it("User exist.", async () => {
                const userTest = (await Users.findOne({username: testingUsers[0].username}))._doc;
                const response = await agent.get(`/user?id=${userTest._id.valueOf()}`);
                expect(response.status).toBe(200);
            });

            it("Return an Object", async () => {
                const userTest = (await Users.findOne({username: testingUsers[0].username}))._doc;
                const response = await agent.get(`/user?id=${userTest._id.valueOf()}`);
                expect(response.body).toHaveProperty("username");
                expect(response.body).toHaveProperty("email");
                expect(response.body).toHaveProperty("password");
            });

            it("The username is right.", async () => {
                const userTest = (await Users.findOne({username: testingUsers[0].username}))._doc;
                const response = await agent.get(`/user?id=${userTest._id.valueOf()}`);
                expect(response.body.username).toBe(testingUsers[0].username);
            });
            
            it("Have an valid email.", async () => {
                const userTest = (await Users.findOne({username: testingUsers[1].username}))._doc;
                const response = await agent.get(`/user?id=${userTest._id.valueOf()}`);
                expect(response.body.email).toMatch(testingUsers[1].email);
            });

            it("Have a password.", async () => {
                const response = await agent.get('/users');
                expect(response.body[1]).toHaveProperty("password");
            });
        });

        it("Should reply with status 400.", async () => {
            const response = await agent.get("/auth");
            expect(response.status).toBeGreaterThanOrEqual(400);
            expect(response).toHaveProperty("error");
        });
        
    });

    describe("GET /user?email", () =>{
        describe("Should reply with status 200. Verify if: ", () =>{
            beforeEach(async() => {
                await agent.post("/auth").send(testingUsers[0]);
                await agent.post("/auth").send(testingUsers[1]);
            });

            it("User exist.", async () => {
                const userTest = (await Users.findOne({username: testingUsers[0].username}))._doc;
                console.log(userTest.email);
                const response = await agent.get(`/user?email=${userTest.email}`);
                expect(response.status).toBe(200);
            });

            it("Return an Object", async () => {
                const userTest = (await Users.findOne({username: testingUsers[0].username}))._doc;
                const response = await agent.get(`/user?id=${userTest._id.valueOf()}`);
                expect(response.body).toHaveProperty("username");
                expect(response.body).toHaveProperty("email");
                expect(response.body).toHaveProperty("password");
            });

            it("The username is right.", async () => {
                const userTest = (await Users.findOne({username: testingUsers[0].username}))._doc;
                const response = await agent.get(`/user?id=${userTest._id.valueOf()}`);
                expect(response.body.username).toBe(testingUsers[0].username);
            });
            
            it("Have an valid email.", async () => {
                const userTest = (await Users.findOne({username: testingUsers[1].username}))._doc;
                const response = await agent.get(`/user?id=${userTest._id.valueOf()}`);
                expect(response.body.email).toMatch(testingUsers[1].email);
            });

            it("Have a password.", async () => {
                const response = await agent.get('/users');
                expect(response.body[1]).toHaveProperty("password");
            });
        });

        it("Should reply with status 400.", async () => {
            const response = await agent.get("/auth");
            expect(response.status).toBeGreaterThanOrEqual(400);
            expect(response).toHaveProperty("error");
        });
        
    });

    xdescribe('PUT /user', () => {
        beforeEach(async() => {
            await createUser(individualUserTest);
            await createUser(testingUsers[1]);
        });
        xdescribe("Should reply with status 200. Verify if: ", () =>{
            it('The update was successful.', async() =>{
                const findUser = await Users.findOne({email: individualUserTest.email});
                const newIndividualUserTest = {id: findUser._id.valueOf(), username: "TestName"};
                await agent.put("/user")
                    .send(newIndividualUserTest)
                    .expect(200);
            });

            it('Can update a username.', async() => {
                const findUserId = (await Users.findOne({email: individualUserTest.email}))._id.valueOf();
                const newIndividualUserTest = {id: findUserId, username: "TestName"};
                const response = await agent.put("/user").send(newIndividualUserTest);
                expect(newIndividualUserTest.username).toBe(response.body.username);
            });

            it('Can update a name.', async() => {
                const findUserId = (await Users.findOne({email: individualUserTest.email}))._id.valueOf();
                const newIndividualUserTest = {id: findUserId, name: "Ansony"};
                const response = await agent.put("/user").send(newIndividualUserTest);
                expect(newIndividualUserTest.name).toBe(response.body.name);
            });

            it('Can update a lastname.', async() => {
                const findUserId = (await Users.findOne({email: individualUserTest.email}))._id.valueOf();
                const newIndividualUserTest = {id: findUserId, lastname: "Rojas"};
                const response = await agent.put("/user").send(newIndividualUserTest);
                expect(newIndividualUserTest.lastname).toBe(response.body.lastname);
            });

            it('Can update an adress.', async() => {
                const findUserId = (await Users.findOne({email: individualUserTest.email}))._id.valueOf();
                const newIndividualUserTest = {id: findUserId, adress: "Silly Road 325"};
                const response = await agent.put("/user").send(newIndividualUserTest);
                expect(newIndividualUserTest.adress).toBe(response.body.adress);
            });

            it('Can update a profile image.', async() => {
                const findUserId = (await Users.findOne({email: individualUserTest.email}))._id.valueOf();
                const newIndividualUserTest = {id: findUserId, profile_img: "imagetest.com"};
                const response = await agent.put("/user").send(newIndividualUserTest);
                expect(newIndividualUserTest.profile_img).toBe(response.body.profile_img);
            });
            
            it('Can update a city.', async() => {
                const findUserId = (await Users.findOne({email: individualUserTest.email}))._id.valueOf();
                const newIndividualUserTest = {id: findUserId, city: "New York"};
                const response = await agent.put("/user").send(newIndividualUserTest);
                const cityById = await agent.get(`/city/${response.body.city}`);
                expect(newIndividualUserTest.city).toBe(cityById.body.name);
            });
            
            it('Can update a country.', async() => {
                const findUserId = (await Users.findOne({email: individualUserTest.email}))._id.valueOf();
                const newIndividualUserTest = {id: findUserId, nation: "United State"};
                const response = await agent.put("/user").send(newIndividualUserTest);
                const countryById = await agent.get(`/country/${response.body.nation}`);
                expect(newIndividualUserTest.nation).toBe(countryById.body.name);
            });
            
            it('Can update a password.', async() => {
                const findUserId = (await Users.findOne({email: individualUserTest.email}))._id.valueOf();
                const newIndividualUserTest = {id: findUserId, password: "TestingPass123"};
                await agent.put("/user").send(newIndividualUserTest);
                const reFoundUserId = (await Users.findOne({email: individualUserTest.email})).password
                const auth = await compare(newIndividualUserTest.password, reFoundUserId);
                expect(auth).toBeTruthy();
            });
            
            it('Can update a email.', async() => {
                const findUserId = (await Users.findOne({email: individualUserTest.email}))._id.valueOf();
                const newIndividualUserTest = {id: findUserId, email: "holamundo@hotmail.com"};
                const response = await agent.put("/user").send(newIndividualUserTest);
                expect(newIndividualUserTest.email).toBe(response.body.email);
            });
        });

        xdescribe('Should reply with status 400: ', () => {
            it('ID not provide.', async() => {
                const newIndividualUserTest = {id: "", email: "testmail@mess.com"};
                const response = await agent.put("/auth").send(newIndividualUserTest);
                expect(response.status).toBeGreaterThanOrEqual(400);
            });
        })
    });

    xdescribe('POST /user', () => {
        beforeAll(async() => {
            await Users.deleteMany({});
        })
        xdescribe("Should reply with status 200. Verify if: ", () => {
            it('The post was successful', async() => {
                await agent.post("/auth")
                    .send(individualUserTest)
                    .expect(200);
            });

            it('The Content-Type is an JSON Aplication', async() => {
                await agent
                    .post("/auth")
                    .send(individualUserTest)
                    .expect('Content-Type', /application\/json/);
            });

            it('User created match with user in DB', async() => {
                await agent.post("/auth").send(individualUserTest);
                const matchedUser = await agent.get(`/users`);
                const dbUser = (await Users.findOne({username: individualUserTest.username}))._doc;
                expect(matchedUser.body[0]._id.valueOf()).toEqual(dbUser._id.valueOf());
            });
        });

        it('Should reply with status 400.', async() => {
            const response = await agent.post("/auth").send();
            expect(response.status).toBeGreaterThanOrEqual(400);
        });
    })

    xdescribe('DELETE /user', () => {
        beforeEach(async() => {
            await createUser(individualUserTest);
            await createUser(testingUsers[1]);
        });
        xdescribe("Should reply with status 200. Verify if: ", () =>{
            it('User delete successful.', async() => {
                const findUser = await Users.findOne({email: individualUserTest.email});
                await agent.delete(`/user/${findUser._id}`)
                    .expect(200);
            });

            it('User cannot be accesible.', async() => {
                const findUser = await Users.findOne({email: individualUserTest.email});
                await agent.delete(`/user/${findUser._id}`).expect(200);
                const allUsersDB = await Users.find();
                expect(allUsersDB).not.toContain(findUser);
            });

            it('The response length of Data Base is right.', async() => {
                const response = (await agent.get('/users')).body.length;
                const findUser = await Users.findOne({email: individualUserTest.email});
                await agent.delete(`/user/${findUser._id}`);
                const { body } = await agent.get('/users');
                expect(body).toHaveLength(response - 1);
            })
        });

        it('Should reply with status 400.', async() => {
            const response = await agent.delete(`/user/${randomID.valueOf()}`);
            expect(response.status).toBeGreaterThanOrEqual(400);
        });
    });

    xdescribe('POST /login', () => {
        beforeEach(async() => {
            await createUser(testingUsers[1]);
        });
        xdescribe("Should reply with status 200. Verify if: ", () => {
            it('Post (userCreateController)', async() => {
                await agent
                    .post('/login')
                    .send({email: testingUsers[1].email, password: testingUsers[1].password})
                    .expect(200);
            });

            it('The Content-Type is an JSON Aplication', async() => {
                await agent
                    .post("/auth")
                    .send(individualUserTest)
                    .expect('Content-Type', /application\/json/);
            });

            it('Data Base ID is the same.', async() => {
                const matchedUser = await agent.get(`/users`);
                const dbUser = (await Users.findOne({username: testingUsers[1].username}))._doc;
                expect(matchedUser.body[0]._id.valueOf()).toEqual(dbUser._id.valueOf());
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