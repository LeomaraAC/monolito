import {app, sequelize} from '../express';
import request from 'supertest';

describe('Product E2E test', () => {
    beforeEach(async () => {
        await sequelize.sync();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a product', async () => {
        const response = await request(app)
            .post('/product')
            .send({
                id: 'P1',
                name: 'Product 1',
                description: 'Desc P1',
                stock: 10,
                purchasePrice: 150.0
            });
        expect(response.status).toBe(201);
    });

    it('should not create a product', async () => {
        const response = await request(app)
            .post('/product')
            .send({
                id: 'P1',
                name: 'Product 1',
                description: 'Desc P1'
            });
        expect(response.status).toBe(500);
    });
});
