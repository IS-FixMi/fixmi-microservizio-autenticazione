const request = require('supertest')('localhost:3001');

//const saRequest = request('localhost:3001');
describe('Logout testing', () => {
    it('should successfully logout', async() => {

        const resLogin = await request
            .post('/api/auth/login')
            .type('form')
            .send({email:"manager@test.com",password:"test",twofa:"12345"});
        let token = resLogin.body.token;

        const res = await request
            .delete('/api/auth/logout')
            .type('form')
            .send({token: token})
        expect(res.statusCode).toEqual(200);
    });
    it("should return an error, because we didn't include fields", async() => {
        const res = await request
            .delete('/api/auth/logout')
            .type('form')
            .send({});

        expect(res.statusCode).toEqual(400);

    });
    it('should return an error for getting the token wrong', async() => {


        const resLogin = await request
            .post('/api/auth/login')
            .type('form')
            .send({email:"manager@test.com",password:"test",twofa:"12345"});
        let token = resLogin.body.token;

        const res = await request
            .delete('/api/auth/logout')
            .type('form')
            .send({token: token+1})
        expect(res.statusCode).toEqual(404);
    });

})
