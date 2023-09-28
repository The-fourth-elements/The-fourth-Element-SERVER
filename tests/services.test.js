const request = require('supertest');
const app = require('../src/app');
const { encrypt } = require('../src/services/crypt');
const mongoose = require('mongoose');
const DB_URI_TEST = require('./templates/URItest');
const { individualUserTest, testingUsers } = require('./templates/user');
const { createUser } = require('./templates/models');
const { Users } = require('../src/models/Users');
const { compare } = require('bcrypt');

const agent = request(app);

beforeAll(async() => {
    await mongoose.connect(DB_URI_TEST);
});

describe('Services Test', () => {
    describe('Crypting', () => {
        beforeEach(async() => {
            await createUser(individualUserTest);
        });

        it("Should return a encrypted password.", async() => {
            const passCrypt1 = await encrypt(individualUserTest.password);
            expect(passCrypt1).not.toBeNull();
            expect(passCrypt1).toContain('$2b$10$');
        });

        it("Should match 2 passwords.", async() => {
            const userFind = await Users.findOne({email: individualUserTest.email})
            const response = (await agent.get(`/user?id=${userFind._id}`)).body.password;
            const auth = await compare(individualUserTest.password, response)
            expect(auth).toBeTruthy();
        });

    });
});

afterAll(async() => {
    await mongoose.disconnect();
})