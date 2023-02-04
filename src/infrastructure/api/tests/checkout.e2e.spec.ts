import {app, sequelize} from '../express';
import request from 'supertest';
import ProductModel from '../../../modules/product-adm/repository/product.model';
import ClientModel from '../../../modules/client-adm/repository/client.model';

describe('Checkout E2E test', () => {
    const products = [
        {
            id: 'P1',
            name: 'Product 1',
            description: 'Desc P1',
            stock: 10,
            purchasePrice: 150.0,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'P2',
            name: 'Product 2',
            description: '',
            stock: 2,
            purchasePrice: 189,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'P3',
            name: 'Product 3',
            description: '',
            stock: 0,
            purchasePrice: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    const client = {
        id: 'C1',
        name: 'client 1',
        email: 'client@gmail.com',
        document: 'doc 1',
        street: 'street 1',
        number: '125',
        complement: '',
        city: 'city 1',
        state: 'street 1',
        zipcode: 'zipcode 1',
        createdAt: new Date(),
        updatedAt: new Date()
    };

    beforeAll(async () => {
        await sequelize.sync();
        for (const product of products) {
            await ProductModel.create(product);
        }
        await ClientModel.create(client);
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should place an order', async () => {
        const validProducts = products.filter(p => p.stock > 0);
        const response = await request(app)
            .post('/checkout')
            .send({
                clientId: client.id,
                products: validProducts.map(p => ({productId: p.id}))
            });
        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.invoiceId).toBeDefined();
        expect(response.body.status).toBe('approved');
        expect(response.body.total).toBe(validProducts.reduce((total, product) => total + product.purchasePrice, 0));
        expect(response.body.products.length).toBe(validProducts.length);
        expect(response.body.products[0].productId).toBe(validProducts[0].id);
        expect(response.body.products[1].productId).toBe(validProducts[1].id);
    });

    it('should not place an order when client does not exist', async () => {
        const response = await request(app)
            .post('/checkout')
            .send({
                id: 'C2',
                products: products.map(p => ({productId: p.id}))
            });
        expect(response.status).toBe(500);
    });

    it('should not place an order when product is out of stock', async () => {
        const response = await request(app)
            .post('/checkout')
            .send({
                id: client.id,
                products: [{productId: products[2]}]
            });
        expect(response.status).toBe(500);
    });
});
