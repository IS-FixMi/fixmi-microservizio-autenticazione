const request = require('supertest')('localhost:3001');
describe('Password Change testing', () => {
    it('should successfully change password', async() => {

        const resRegister = await request
            .post('/api/auth/register')
            .type('form')
            .send({email:"pwdtest@test.com",password:"test",twofa:"12345"});


        const res = await request
            .patch('/api/auth/changepass')
            .type('form')
            .send({email:"pwdtest@test.com",new_password:"test1",twofa:"12345"});
        expect(res.statusCode).toEqual(200);

        const resLogin = await request
            .post('/api/auth/login')
            .type('form')
            .send({email:"pwdtest@test.com",password:"test1",twofa:"12345"});
        expect(resLogin.statusCode).toEqual(200);
        //cleanup
        await request.delete('/api/auth/remove')
            .type('form')
            .send({email:"pwdtest@test.com",password:"test1",twofa:"12345"});

    });
    it("should return an error, because we didn't include fields", async() => {
        const res = await request
            .patch('/api/auth/changepass')
            .type('form')
            .send({});

        expect(res.statusCode).toEqual(400);

    });


})