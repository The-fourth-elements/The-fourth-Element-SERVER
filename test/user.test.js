const supertest = require('supertest');
const routes = require('../src/routes/index');
const { describe } = require('node:test');

const api = supertest(routes)

describe('About /user entry point', () => {
    it('Post (userCreateController)', async() => {
        const userTest = {
            "name":"pepito",
            "lastName":"p",
            "adress":"asdasdasda",
            "city":10,
            "natinality":10,
            "module":[],
            "role":1,
             "progress":10,
             "status":true,
             "profile_img":"asdasdasd",
             "email":"manu07x@hotmail.com",
             "password":"123456"
        }

        await api
            .post('/user')
            .send(userTest)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    })
})