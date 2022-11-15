import UseCaseInterface from '../../../@shared/usecase/use-case.interface';
import InvoiceGateway from '../../gateway/invoice.gateway';
import {FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO} from './find-invoice.dto';

export default class FindInvoiceUsecase implements UseCaseInterface {

    constructor(private invoiceRepository: InvoiceGateway) {
    }

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const invoice = await this.invoiceRepository.find(input.id);
        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                city: invoice.address.city,
                number: invoice.address.number,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
                complement: invoice.address.complement
            },
            items: invoice.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price
            })),
            total: invoice.total,
            createdAt: invoice.createdAt
        };
    }

}
