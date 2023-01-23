import {Sequelize} from 'sequelize-typescript';
import {initSequelize} from '../../@shared/test/base-test';
import ClientModel from './model/client.model';
import ProductModel from './model/product.model';
import OrderModel from './model/order.model';
import OrderProductModel from './model/order-product.model';
import Order from '../domain/order.entity';
import Product from '../domain/product.entity';
import Id from '../../@shared/domain/value-object/id.value-object';
import Client from '../domain/client.entity';
import CheckoutRepository from './checkout.repository';

describe('checkout repository unit test', () => {
    let sequelize: Sequelize;
    const p1 = new Product({id: new Id('p1'), name: 'Product 1', description: 'Description 1', salesPrice: 105});
    const p2 = new Product({id: new Id('p2'), name: 'Product 2', description: '', salesPrice: 18});
    const client = new Client({id: new Id('c1'), name: 'client 1', address: 'address 1', email: 'c1@mail.com'});
    const order = new Order({id: new Id('o1'), status: 'approved', client, products: [p1, p2]});

    const productToJson = (product: Product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
    });

    const productModelToJson = (product: ProductModel) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
    });

    beforeEach(async () => {
        sequelize = await initSequelize([ClientModel, ProductModel, OrderModel, OrderProductModel]);
        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
        });
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should add a new order', async () => {
        const repository = new CheckoutRepository();
        await repository.addOrder(order);

        const orderDb = await OrderModel.findOne({
            where: {id: order.id.id},
            include: [{model: ClientModel}, {model: ProductModel}]
        });

        expect(orderDb).toBeDefined();
        expect(orderDb.id).toBe(order.id.id);
        expect(orderDb.status).toBe(order.status);
        expect(orderDb.client).toBeDefined();
        expect(orderDb.client.id).toBe(order.client.id.id);
        expect(orderDb.client.address).toBe(order.client.address);
        expect(orderDb.client.name).toBe(order.client.name);
        expect(orderDb.client.email).toBe(order.client.email);
        expect(orderDb.products.length).toBe(order.products.length);
        expect(productModelToJson(orderDb.products[0])).toEqual(productToJson(p1));
        expect(productModelToJson(orderDb.products[1])).toEqual(productToJson(p2));

    });

    it('should find an order', async () => {
        await OrderModel.create({
                id: order.id.id,
                status: order.status,
                clientId: order.client.id.id,
                products: order.products.map(product => ({
                    id: product.id.id,
                    name: product.name,
                    description: product.description,
                    salesPrice: product.salesPrice
                }))
            },
            {include: [{model: ClientModel}, {model: ProductModel}]});
        const repository = new CheckoutRepository();

        const orderFound = await repository.findOrder(order.id.id);
        expect(orderFound).toBeDefined();
        expect(orderFound.id.id).toBe(order.id.id);
        expect(orderFound.status).toBe(order.status);
        expect(orderFound.total).toBe(order.total);
        expect(orderFound.client.id.id).toBe(order.client.id.id);
        expect(orderFound.client.name).toBe(order.client.name);
        expect(orderFound.client.address).toBe(order.client.address);
        expect(orderFound.client.email).toBe(order.client.email);
        expect(orderFound.products.length).toBe(order.products.length);
        expect(productToJson(orderFound.products[0])).toEqual(productToJson(p1));
        expect(productToJson(orderFound.products[1])).toEqual(productToJson(p2));
    });
});
