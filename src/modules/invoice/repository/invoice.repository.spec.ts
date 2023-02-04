import {Sequelize} from 'sequelize-typescript';
import {initSequelize} from '../../@shared/test/base-test';
import InvoiceModel from './model/invoice.model';
import ProductModel from './model/product.model';
import InvoiceRepository from './invoice.repository';
import Invoice from '../domain/invoice.entity';
import Id from '../../@shared/domain/value-object/id.value-object';
import Address from '../domain/address.value-object';
import Product from '../domain/product.entity';
import InvoiceProductModel from './model/invoice-product.model';

describe('invoice repository unit test', () => {
    const invoice = new Invoice({
        id: new Id('1'),
        name: 'Invoice 1',
        document: 'Document 1',
        address: new Address({
            city: 'City A',
            number: '1A',
            state: 'State A',
            street: 'Street A',
            zipCode: 'Zip A'
        }),
        items: [
            new Product({
                id: new Id('1'),
                name: 'Product 1',
                price: 100
            }),
            new Product({
                id: new Id('2'),
                name: 'Product 2',
                price: 120
            })
        ]
    });

    const productToJson = (product: Product) => ({
        id: product.id.id,
        name: product.name,
        price: product.price
    });

    const productModelToJson = (product: ProductModel) => ({
        id: product.id,
        name: product.name,
        price: product.price
    });

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = await initSequelize([InvoiceModel, ProductModel, InvoiceProductModel]);

        for (const product of invoice.items) {
            await ProductModel.create({
                id: product.id.id,
                name: product.name,
                price: product.price
            });
        }
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should save a new invoice', async () => {
        const repository = new InvoiceRepository();
        await repository.save(invoice);

        const invoiceDb = await InvoiceModel.findOne({
            where: {id: invoice.id.id},
            include: [{model: ProductModel}]}
        );

        expect(invoiceDb).toBeDefined();
        expect(invoiceDb.id).toBe(invoice.id.id);
        expect(invoiceDb.name).toBe(invoice.name);
        expect(invoiceDb.document).toBe(invoice.document);
        expect(invoiceDb.document).toBe(invoice.document);
        expect(invoiceDb.complement).toBe(invoice.address.complement);
        expect(invoiceDb.street).toBe(invoice.address.street);
        expect(invoiceDb.state).toBe(invoice.address.state);
        expect(invoiceDb.city).toBe(invoice.address.city);
        expect(invoiceDb.number).toBe(invoice.address.number);
        expect(invoiceDb.zipCode).toBe(invoice.address.zipCode);
        expect(invoiceDb.items.length).toBe(invoice.items.length);
        expect(productModelToJson(invoiceDb.items[0])).toEqual(productToJson(invoice.items[0]));
        expect(productModelToJson(invoiceDb.items[1])).toEqual(productToJson(invoice.items[1]));
    });

    it('should find a invoice', async () => {
        const repository = new InvoiceRepository();
        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode
        });

        for (const item of invoice.items) {
            await InvoiceProductModel.create({
                invoiceId: invoice.id.id,
                productId: item.id.id
            });
        }

        const invoiceFound = await repository.find(invoice.id.id);

        expect(invoiceFound).toBeDefined();
        expect(invoiceFound.id).toEqual(invoice.id);
        expect(invoiceFound.name).toBe(invoice.name);
        expect(invoiceFound.document).toBe(invoice.document);
        expect(invoiceFound.address).toEqual(invoice.address);
        expect(invoiceFound.items.length).toBe(invoice.items.length);
        expect(productToJson(invoiceFound.items[0])).toEqual(productToJson(invoice.items[0]));
        expect(productToJson(invoiceFound.items[1])).toEqual(productToJson(invoice.items[1]));
    });

    it('should throw an error when not found invoice', async () => {
        const repository = new InvoiceRepository();
        await expect(async () => await repository.find('1')).rejects.toThrowError('Invoice not found');
    });
});
