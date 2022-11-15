import UseCaseInterface from '../../../@shared/usecase/use-case.interface';
import {GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto} from './generate-invoice.dto';
import Invoice from '../../domain/invoice.entity';
import Address from '../../domain/address.value-object';
import Product from '../../domain/product.entity';
import Id from '../../../@shared/domain/value-object/id.value-object';
import InvoiceGateway from '../../gateway/invoice.gateway';

export default class GenerateInvoiceUsecase implements UseCaseInterface {

    constructor(private invoiceRepository: InvoiceGateway) {
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            address: new Address({
                street: input.street,
                number: input.number,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode,
                complement: input.complement,
            }),
            items: input.items.map(item => new Product({
                id: new Id(item.id),
                name: item.name,
                price: item.price
            }))
        });
        await this.invoiceRepository.save(invoice);
        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            city: invoice.address.city,
            street: invoice.address.street,
            complement: invoice.address.complement,
            number: invoice.address.number,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            total: invoice.total,
            items: invoice.items.map(item => ({id: item.id.id, name: item.name, price: item.price}))
        };
    }

}
