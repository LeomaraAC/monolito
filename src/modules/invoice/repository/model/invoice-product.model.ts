import {Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import InvoiceModel from './invoice.model';
import ProductModel from './product.model';

@Table({
    tableName: 'invoices_products',
    timestamps: false
})
export default class InvoiceProductModel extends Model{
    @ForeignKey(() => InvoiceModel)
    @Column({allowNull: false})
    invoiceId: string;

    @ForeignKey(() => ProductModel)
    @Column({allowNull: false})
    productId: string;
}
