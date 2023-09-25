const request = require('supertest');
const { encrypt } = require('../src/services/crypt');
const mongoose = require('mongoose');
const DB_URI_TEST = require('./templates/URItest');
const { individualUserTest, testingUsers } = require('./templates/user');
const { createUser } = require('./templates/models');
const { Users } = require('../src/models/Users');

beforeAll(async() => {
    await mongoose.connect(DB_URI_TEST);
});

describe('Services Test', () => {
    describe('Crypting', () => {
        beforeEach(async() => {
            await createUser(individualUserTest);
        });

        it("Should return a encrypted password", async()=>{
            const passCrypt1 = await encrypt(individualUserTest.password);
            expect(passCrypt1).not.toBeNull();
            expect(passCrypt1).toContain('$2b$10$');
        });

    });
});

afterAll(async() => {
    await mongoose.disconnect();
})