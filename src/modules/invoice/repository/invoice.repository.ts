import InvoiceGateway from '../gateway/invoice.gateway';
import Invoice from '../domain/invoice.entity';
import InvoiceModel from './model/invoice.model';
import ProductModel from './model/product.model';
import Id from '../../@shared/domain/value-object/id.value-object';
import Address from '../domain/address.value-object';
import Product from '../domain/product.entity';

export default class InvoiceRepository implements InvoiceGateway {
    async find(id: string): Promise<Invoice> {
        try {
            const model = await InvoiceModel.findOne({where: {id}, include: ProductModel, rejectOnEmpty: true});
            return new Invoice({
                id: new Id(model.id),
                name: model.name,
                document: model.document,
                address: new Address({
                    complement: model.complement,
                    street: model.street,
                    city: model.city,
                    number: model.number,
                    zipCode: model.zipCode,
                    state: model.state
                }),
                items: model.items.map(item => new Product({
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price
                }))
            });
        } catch (e) {
            throw new Error('Invoice not found');
        }
    }

    async save(invoice: Invoice): Promise<void> {
        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price
            }))
        }, {include: [{model: ProductModel}]});
    }

}
