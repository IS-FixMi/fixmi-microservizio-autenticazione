const request = require('supertest');

describe('Two Factor Authentication Testing', () => {
    it('should successfully send twofa', async() => {
        const res = await request("localhost:3001")
            .post('/api/auth/twofa')
            .type('form')
            .send({email:"test@test.com"});
        expect(res.statusCode).toEqual(200);
    })
    it("should return an error, because we didn't specify email", async() => {
        const res = await request("localhost:3001")
            .post('/api/auth/twofa')
            .type('form')
            .send({});
        expect(res.statusCode).toEqual(400);
    })
})

