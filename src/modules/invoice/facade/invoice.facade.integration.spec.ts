import {Sequelize} from 'sequelize-typescript';
import {initSequelize} from '../../@shared/test/base-test';
import InvoiceModel from '../repository/model/invoice.model';
import ProductModel from '../repository/model/product.model';
import InvoiceProductModel from '../repository/model/invoice-product.model';
import InvoiceFacadeFactory from '../factory/invoice.facade.factory';

describe('invoice facade integration test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = await initSequelize([InvoiceModel, ProductModel, InvoiceProductModel]);
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should generate an invoice', async () => {
        const facade = InvoiceFacadeFactory.create();
        const input = {
            name: 'Invoice 1',
            document: 'Document 1',
            city: 'City A',
            number: '1A',
            state: 'State A',
            street: 'Street A',
            zipCode: 'Zip A',
            complement: 'Complement A',
            items: [
                {
                    id: '1',
                    name: 'Product 1',
                    price: 100
                }
            ]
        };
        const invoice = await facade.generate(input);

        const invoiceDb = await InvoiceModel.findOne({where: {id: invoice.id}, include: [{model: ProductModel}]});

        expect(invoice.id).toBeDefined();
        expect(invoiceDb).toBeDefined();
        expect(invoiceDb.name).toBe(invoice.name);
        expect(invoiceDb.document).toBe(invoice.document);
        expect(invoiceDb.document).toBe(invoice.document);
        expect(invoiceDb.complement).toBe(invoice.complement);
        expect(invoiceDb.street).toBe(invoice.street);
        expect(invoiceDb.state).toBe(invoice.state);
        expect(invoiceDb.city).toBe(invoice.city);
        expect(invoiceDb.number).toBe(invoice.number);
        expect(invoiceDb.zipCode).toBe(invoice.zipCode);
        expect(invoiceDb.items.length).toBe(invoice.items.length);
        expect(invoiceDb.items[0].id).toBe(invoice.items[0].id);
        expect(invoiceDb.items[0].name).toBe(invoice.items[0].name);
        expect(invoiceDb.items[0].price).toBe(invoice.items[0].price);
        expect(invoice.total).toBe(100);
    });

    it('should find a invoice', async () => {
        const invoice = {
            id: '2',
            name: 'Invoice 1',
            document: 'Document 1',
            city: 'City A',
            number: '1A',
            state: 'State A',
            street: 'Street A',
            zipCode: 'Zip A',
            complement: 'Complement A',
            items: [
                {
                    id: '1',
                    name: 'Product 1',
                    price: 100
                }
            ]
        };
        await InvoiceModel.create(invoice, {include: [{model: ProductModel}]});

        const facade = InvoiceFacadeFactory.create();
        const invoiceFound = await facade.find({id: '2'});

        expect(invoiceFound).toBeDefined();
        expect(invoiceFound.id).toEqual(invoice.id);
        expect(invoiceFound.name).toBe(invoice.name);
        expect(invoiceFound.document).toBe(invoice.document);
        expect(invoiceFound.address).toEqual({
            city: invoice.city,
            number: invoice.number,
            state: invoice.state,
            street: invoice.street,
            zipCode: invoice.zipCode,
            complement: invoice.complement
        });
        expect(invoiceFound.items.length).toBe(invoice.items.length);
        expect(invoiceFound.items).toEqual(invoice.items);
        expect(invoiceFound.total).toBe(100);
    });
});
