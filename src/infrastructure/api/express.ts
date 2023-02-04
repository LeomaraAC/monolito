import express, {Express} from 'express';
import {Sequelize} from 'sequelize-typescript';
import OrderModel from '../../modules/checkout/repository/model/order.model';
import OrderProductModel from '../../modules/checkout/repository/model/order-product.model';
import InvoiceModel from '../../modules/invoice/repository/model/invoice.model';
import InvoiceProductModel from '../../modules/invoice/repository/model/invoice-product.model';
import {productRoute} from './routes/product.route';
import ClientModel from '../../modules/client-adm/repository/client.model';
import ProductModel from '../../modules/product-adm/repository/product.model';
import {checkoutRoute} from './routes/checkout.route';
import {clientRoute} from './routes/client.route';
import {invoiceRoute} from './routes/invoice.route';
import {default as ProductModelCatalog} from '../../modules/store-catalog/repository/product.model';
import {default as ClientModelCheckout} from '../../modules/checkout/repository/model/client.model';
import {default as ProductModelCheckout} from '../../modules/checkout/repository/model/product.model';
import {default as ProductModelInvoice} from '../../modules/invoice/repository/model/product.model';
import TransactionModel from '../../modules/payment/repository/transaction.model';

export const app: Express = express();
app.use(express.json());
app.use('/product', productRoute);
app.use('/client', clientRoute);
app.use('/invoice', invoiceRoute);
app.use('/checkout', checkoutRoute);

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        models: [ClientModelCheckout, ProductModelCheckout, ProductModelCatalog,
            ProductModelInvoice, ClientModel, ProductModel, OrderModel, OrderProductModel, InvoiceModel,
            InvoiceProductModel, TransactionModel]
    });
    await sequelize.sync();
}

setupDb();

