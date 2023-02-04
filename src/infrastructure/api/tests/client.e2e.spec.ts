import {app, sequelize} from '../express';
import request from 'supertest';

describe('Client E2E test', () => {
    beforeAll(async () => {
        await sequelize.sync();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a client', async () => {
        const response = await request(app)
            .post('/client')
            .send({
                id: 'C1',
                name: 'client 1',
                email: 'client@gmail.com',
                document: 'doc 1',
                street: 'street 1',
                number: '125',
                complement: '',
                city: 'city 1',
                state: 'street 1',
                zipcode: 'zipcode 1'
            });
        expect(response.status).toBe(201);
    });

    it('should not create a client', async () => {
        const response = await request(app)
            .post('/client')
            .send({
                id: 'C1',
                name: 'client 1'
            });
        expect(response.status).toBe(500);
    });
});
