import InvoiceRepository from '../repository/invoice.repository';
import FindInvoiceUsecase from '../usecase/find-invoice/find-invoice.usecase';
import GenerateInvoiceUsecase from '../usecase/generate-invoice/generate-invoice.usecase';
import InvoiceFacadeInterface from '../facade/invoice.facade.interface';
import InvoiceFacade from '../facade/invoice.facade';

export default class InvoiceFacadeFactory {
    static create(): InvoiceFacadeInterface {
        const repository = new InvoiceRepository();
        const findUsecase = new FindInvoiceUsecase(repository);
        const generateUsecase = new GenerateInvoiceUsecase(repository);
        return new InvoiceFacade({findUsecase, generateUsecase});
    }
}
