const request = require('supertest')('localhost:3001');
describe('Account deletion testing', () => {
    it('should successfully change password', async() => {

        const resRegister = await request
            .post('/api/auth/register')
            .type('form')
            .send({email:"removetest@test.com",password:"test",twofa:"12345"});


        //cleanup
        const resRemove =await request
            .delete('/api/auth/remove')
            .type('form')
            .send({email:"removetest@test.com",password:"test",twofa:"12345"});
        expect(resRemove.statusCode).toEqual(200);

    });
    it("should return an error, because we didn't include fields", async() => {
        const res = await request
            .delete('/api/auth/remove')
            .type('form')
            .send({});

        expect(res.statusCode).toEqual(400);

    });
    it('should return an error, because no user', async() => {

        const resRemove = await request
            .delete('/api/auth/remove')
            .type('form')
            .send({email:"removetest@test.com",password:"test",twofa:"12345"});
        expect(resRemove.statusCode).toEqual(404);


    });


})