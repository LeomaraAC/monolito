import CheckoutGateway from '../gateway/checkout.gateway';
import Order from '../domain/order.entity';
import OrderModel from './model/order.model';
import ClientModel from './model/client.model';
import ProductModel from './model/product.model';

export default class CheckoutRepository implements CheckoutGateway {
    async addOrder(order: Order): Promise<void> {
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
    }

    async findOrder(id: string): Promise<Order | null> {
        return Promise.resolve(undefined);
    }

}
