const request = require('supertest');

describe('Login testing', () => {
    it('should successfully login', async() => {
        const res = await request("localhost:3001")
            .post('/api/auth/login')
            .type('form')
            .send({email:"test@test.com",password:"test",twofa:"12345"});
        expect(res.statusCode).toEqual(200);
    })
    it("should return an error, because we didn't include fields", async() => {
        const res = await request("localhost:3001")
            .post('/api/auth/login')
            .type('form')
            .send({});
        expect(res.statusCode).toEqual(400);
    })
    it('should return an error for not finding an user', async() => {
        const res = await request("localhost:3001")
            .post('/api/auth/login')
            .type('form')
            .send({email:"pippo",password:"test",twofa:"12345"});
        expect(res.statusCode).toEqual(404);
    })
    it('should return an error for wrong password', async() => {
        const res = await request("localhost:3001")
            .post('/api/auth/login')
            .type('form')
            .send({email:"test@test.com",password:"test1",twofa:"12345"});
        expect(res.statusCode).toEqual(404);
    })
})
