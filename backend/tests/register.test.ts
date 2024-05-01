const request = require('supertest')('localhost:3001');
describe('Register testing', () => {
    it('should successfully change password', async() => {

        const resRegister = await request
            .post('/api/auth/register')
            .type('form')
            .send({email:"registertest1@test.com",password:"test",twofa:"12345"});
        expect(resRegister.statusCode).toEqual(200);
        const resLogin = await request
            .post('/api/auth/login')
            .type('form')
            .send({email:"registertest1@test.com",password:"test",twofa:"12345"});
        expect(resLogin.statusCode).toEqual(200);
        //cleanup
        await request.delete('/api/auth/remove')
            .type('form')
            .send({email:"registertest1@test.com",password:"test",twofa:"12345"});

    });
    it("should return an error, because we didn't include fields", async() => {
        const res = await request
            .post('/api/auth/register')
            .type('form')
            .send({});

        expect(res.statusCode).toEqual(400);

    });
    it('should return an error, because user already exists', async() => {

        const resRegister = await request
            .post('/api/auth/register')
            .type('form')
            .send({email:"test@test.com",password:"test",twofa:"12345"});
        expect(resRegister.statusCode).toEqual(400);


    });


})