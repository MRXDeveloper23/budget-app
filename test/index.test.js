const index = require('../index')
const supertest = require('supertest')

describe('Create user test', () => {
    it('Create user in mongodb', async () => {
        const response = await supertest(index).post('/user/create').send({
            username: 'alex',
            password: 'abcd1234',
            email: 'abcd1234@gmail.com',
            role: 'admin',
        })
        expect(response.status).toBe(201)
        expect(response.body.message).toEqual('User added successfully')
    })
    it('Getting error message in adding user', async () => {
        const response = await supertest(index).post('/user/create').send({
            username: 'daniel',
            password: 'abcd',
            email: 'abcd@gmail.com',
            role: 'member',
        })
        expect(response.status).toBe(400)
    })
    it('Login without access token', async () => {
        const response = await supertest(index).get('/login')
        expect(response.status).toBe(401)
        expect(response.body).toEqual('Unauthorized')
    })
})
