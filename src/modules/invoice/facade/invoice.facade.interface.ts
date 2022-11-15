import {FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO} from './dto/find-invoice.facade.dto';
import {GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto} from './dto/generate-invoice.facade.dto';

export default interface InvoiceFacadeInterface {
    find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO>;
    generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>;
}
