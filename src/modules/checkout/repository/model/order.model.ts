import {BelongsTo, BelongsToMany, Column, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
import ClientModel from './client.model';
import ProductModel from './product.model';
import OrderProductModel from './order-product.model';

@Table({
    tableName: 'orders',
    timestamps: false
})
export default class OrderModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @Column({allowNull: false})
    status: string;

    @ForeignKey(() => ClientModel)
    @Column({allowNull: false})
    clientId: string;

    @BelongsTo(() => ClientModel)
    client: ClientModel;

    @BelongsToMany(() => ProductModel, {through: {model: () => OrderProductModel}})
    products: ProductModel[];
}
