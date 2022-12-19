import {Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import OrderModel from './order.model';
import ProductModel from './product.model';

@Table({
    tableName: 'orders_products',
    timestamps: false
})
export default class OrderProductModel extends Model {
    @ForeignKey(() => OrderModel)
    @Column({allowNull: false})
    orderId: string;

    @ForeignKey(() => ProductModel)
    @Column({allowNull: false})
    productId: string;
}
