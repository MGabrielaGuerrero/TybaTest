const request = require('supertest');
const app = require('../app');
const User = require('../models/user.model');

afterAll(async () => {
    await User.deleteOne({ mail: 'testuser@example.com' });
});

describe('auth endpoints', () => {
    describe('SingUp post /singUp', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/singUp')
                .send({
                    data: {
                        userName: 'testuser',
                        mail: 'testuser@example.com',
                        password: 'password123'
                    }
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('token');
        });
        it('should fail when user is duplicate', async () => {
            const res = await request(app)
                .post('/singUp')
                .send({
                    data: {
                        userName: 'testuser',
                        mail: 'testuser@example.com',
                        password: 'password123'
                    }
                });
            expect(res.statusCode).toEqual(400);
        });

    });

    describe('SingIn post /signIn', () => {
        it('should singIn with user before created', async () => {
            const res = await request(app)
                .post('/signIn')
                .send({
                    data: {
                        userName: 'testuser',
                        password: 'password123'
                    }
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });
        it('should fail when passwprd is incorrect', async () => {
            const res = await request(app)
                .post('/signIn')
                .send({
                    data: {
                        userName: 'testuser',
                        password: 'password124'
                    }
                });
            expect(res.statusCode).toEqual(400);
        });

    });

})