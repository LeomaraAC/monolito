import {app, sequelize} from '../express';
import request from 'supertest';
import InvoiceModel from '../../../modules/invoice/repository/model/invoice.model';
import InvoiceProductModel from '../../../modules/invoice/repository/model/invoice-product.model';
import ProductModel from '../../../modules/product-adm/repository/product.model';

describe('Invoice E2E test', () => {
    const invoiceData = {
        id: 'I1',
        name: 'invoice 1',
        document: 'document',
        street: 'street 1',
        number: 'number 1',
        complement: 'complement 1',
        city: 'city 1',
        state: 'state 1',
        zipCode: 'zipCode 1'
    };
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
        }
    ];

    beforeAll(async () => {
        await sequelize.sync();
        for (const product of products) {
            await ProductModel.create(product);
        }

        await InvoiceModel.create(invoiceData);
        for (const product of products) {
            await InvoiceProductModel.create({
                invoiceId: invoiceData.id,
                productId: product.id
            });
        }

    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should find a invoice', async () => {
        const response = await request(app)
            .get(`/invoice/${invoiceData.id}`)
            .send();
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(invoiceData.id);
        expect(response.body.name).toBe(invoiceData.name);
        expect(response.body.address.street).toBe(invoiceData.street);
        expect(response.body.address.number).toBe(invoiceData.number);
        expect(response.body.address.complement).toBe(invoiceData.complement);
        expect(response.body.address.city).toBe(invoiceData.city);
        expect(response.body.address.state).toBe(invoiceData.state);
        expect(response.body.address.zipCode).toBe(invoiceData.zipCode);
        expect(response.body.items.length).toBe(2);
        expect(response.body.items[0].id).toBe(products[0].id);
        expect(response.body.items[0].name).toBe(products[0].name);
        expect(response.body.items[0].price).toBe(products[0].purchasePrice);
        expect(response.body.items[1].id).toBe(products[1].id);
        expect(response.body.items[1].name).toBe(products[1].name);
        expect(response.body.items[1].price).toBe(products[1].purchasePrice);
        expect(response.body.total).toBe(products.reduce((acc, p) => acc + p.purchasePrice, 0));
    });

    it('should not find a invoice', async () => {
        const response = await request(app)
            .get('/invoice/I2')
            .send();
        expect(response.status).toBe(404);
    });
});
