import CheckoutGateway from '../gateway/checkout.gateway';
import Order from '../domain/order.entity';
import OrderModel from './model/order.model';
import ClientModel from './model/client.model';
import ProductModel from './model/product.model';
import Client from '../domain/client.entity';
import Id from '../../@shared/domain/value-object/id.value-object';
import Product from '../domain/product.entity';
import OrderProductModel from './model/order-product.model';

export default class CheckoutRepository implements CheckoutGateway {
    async addOrder(order: Order): Promise<void> {
        await OrderModel.create({
                id: order.id.id,
                status: order.status,
                clientId: order.client.id.id
            },
            {include: [{model: ClientModel}]});
        for (const product of order.products) {
            await OrderProductModel.create({
                orderId: order.id.id,
                productId: product.id.id
            });
        }
    }

    async findOrder(id: string): Promise<Order | null> {
        try {
            const model = await OrderModel.findOne({
                where: {id},
                include: [{model: ClientModel}, {model: ProductModel}],
                rejectOnEmpty: true});
            const client = new Client({
                id: new Id(model.client.id),
                name: model.client.name,
                email: model.client.email,
                address: model.client.address
            });
            const products = model.products.map(product => new Product({
                id: new Id(product.id),
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
            }));
            return new Order({id: new Id(model.id), status: model.status, client, products});
        } catch (e) {
            throw new Error('Invoice not found');
        }
    }

}
