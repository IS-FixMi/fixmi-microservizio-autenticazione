const request = require('supertest');

describe('authenticate api testing ', () => {
    it('should successfully authenticate the token', async() => {
        //first login
        const loginRes = await request("localhost:3001")
            .post('/api/auth/login')
            .type('form')
            .send({email:"manager@test.com",password:"test",twofa:"12345"});
        expect(loginRes.statusCode).toEqual(200);
        let token = loginRes.body.token;
        const res = await request("localhost:3001")
            .post('/api/auth/authenticate')
            .type('form')
            .send({token: token})
        expect(res.status).toEqual(200);
    })
    it("should return an error, because we didn't include fields", async() => {
        const res = await request("localhost:3001")
            .post('/api/auth/authenticate')
            .type('form')
            .send({});
        expect(res.statusCode).toEqual(400);
    })
    it('should return an error for not finding an user', async() => {
        const res = await request("localhost:3001")
            .post('/api/auth/authenticate')
            .type('form')
            .send({token:'a1234124s221'});
        expect(res.statusCode).toEqual(404);
    })
    
})
