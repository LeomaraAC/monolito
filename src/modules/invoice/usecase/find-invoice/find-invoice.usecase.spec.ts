import Id from '../../../@shared/domain/value-object/id.value-object';
import Invoice from '../../domain/invoice.entity';
import Address from '../../domain/address.value-object';
import Product from '../../domain/product.entity';
import FindInvoiceUsecase from './find-invoice.usecase';
import {MockInvoiceRepository} from '../../@test/mock/repository.mock';

const invoice = new Invoice({
    id: new Id('1'),
    name: 'Invoice 1',
    document: 'Document 1',
    address: new Address({
        city: 'City A',
        number: '1A',
        state: 'State A',
        street: 'Street A',
        zipCode: 'Zip A'
    }),
    items: [
        new Product({
            id: new Id('1'),
            name: 'Product 1',
            price: 100
        }),
        new Product({
            id: new Id('2'),
            name: 'Product 2',
            price: 120
        })
    ]
});

describe('find invoice usecase unit test', () => {
    const productToJson = (product: Product) => ({
        id: product.id.id,
        name: product.name,
        price: product.price
    });

    it('should find an invoice', async () => {
        const repository = MockInvoiceRepository();
        repository.find.mockReturnValue(Promise.resolve(invoice));
        const usecase = new FindInvoiceUsecase(repository);

        const result = await usecase.execute({id: invoice.id.id});

        expect(repository.find).toHaveBeenCalledWith(invoice.id.id);
        expect(result.id).toBe(invoice.id.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.total).toBe(invoice.total);
        expect(result.address).toEqual({
            street: invoice.address.street,
            city: invoice.address.city,
            number: invoice.address.number,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            complement: invoice.address.complement
        });
        expect(result.items.length).toBe(invoice.items.length);
        expect(result.items[0]).toEqual(productToJson(invoice.items[0]));
        expect(result.items[1]).toEqual(productToJson(invoice.items[1]));
    });

    it('should throw error when not found invoice', async () => {
        const productRepository = MockInvoiceRepository();
        productRepository.find.mockRejectedValue(new Error('Invoice not found'));
        const usecase = new FindInvoiceUsecase(productRepository);
        await expect(usecase.execute({id: '1'})).rejects.toThrowError('Invoice not found');
    });
});
