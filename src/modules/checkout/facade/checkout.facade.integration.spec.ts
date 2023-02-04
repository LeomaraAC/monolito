import {Sequelize} from 'sequelize-typescript';
import {initSequelize} from '../../@shared/test/base-test';
import OrderModel from '../repository/model/order.model';
import OrderProductModel from '../repository/model/order-product.model';
import CheckoutFacadeFactory from '../factory/checkout.facade.factory';
import ClientModel from '../../client-adm/repository/client.model';
import ProductModel from '../../product-adm/repository/product.model';
import InvoiceModel from '../../invoice/repository/model/invoice.model';
import InvoiceProductModel from '../../invoice/repository/model/invoice-product.model';
import {default as ProductModelInvoice} from '../../invoice/repository/model/product.model';
import TransactionModel from '../../payment/repository/transaction.model';
import {default as ProductModelCatalog} from '../../store-catalog/repository/product.model';
import {default as ClientModelCheckout} from '../repository/model/client.model';
import {default as ProductModelCheckout} from '../repository/model/product.model';


describe('checkout facade integration test', () => {
    let sequelize: Sequelize;
    const clientData = {
        id: 'C1',
        name: 'Client 1',
        email: 'client@gmail.com',
        document: 'doc 1',
        street: 'street 1',
        number: 'number 1',
        complement: 'complement 1',
        city: 'city 1',
        state: 'state 1',
        zipcode: 'zip 1',
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const productData = {
        id: 'P1',
        name: 'Product 1',
        description: 'Product 1 description',
        purchasePrice: 125.36,
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    beforeEach(async () => {
        sequelize =  await initSequelize([ClientModelCheckout, ProductModelCheckout, ProductModelCatalog,
            ProductModelInvoice, ClientModel, ProductModel, OrderModel, OrderProductModel, InvoiceModel,
            InvoiceProductModel, TransactionModel]);
        await ClientModel.create({...clientData});
        await ProductModel.create({...productData});
    });

    afterEach(() => {
        sequelize.close();
    });

    it('should place an order', async () => {
        const facade = CheckoutFacadeFactory.create();
        const result = await facade.placeOrder({
            clientId: clientData.id,
            products: [{productId: productData.id}]
        });
        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.status).toBe('approved');
        expect(result.total).toBe(productData.purchasePrice);
        expect(result.products.length).toBe(1);
        expect(result.products[0].productId).toBe(productData.id);
    });

});
