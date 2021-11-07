'use strict';

const {server} = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(server);
const {db} = require('../src/models/index');
const basicAuthMiddleware = require('../src/auth/basicAuth');


beforeAll(async () => {
    await db.sync();
});

afterAll(async () => {
    await db.drop();
});

describe('Server testing', () => {

    test('POST to /signup to create a new user', async () => {
        const res = await mockRequest.post('/signup').send({
            username: "john",
            password: "foo"
        });

        expect(res.status).toBe(201);
    })

    test('POST to /signin to login as a user', async () => {
        await mockRequest.post('/signup').send({
            username: "john",
            password: "foo"
        });

        
        let res = await mockRequest.post('/signin').auth("john", "foo");

        expect(res.status).toBe(200);
    })

})