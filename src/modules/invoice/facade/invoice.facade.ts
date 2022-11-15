import InvoiceFacadeInterface from './invoice.facade.interface';
import {FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO} from './dto/find-invoice.facade.dto';
import {GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto} from './dto/generate-invoice.facade.dto';
import UseCaseInterface from '../../@shared/usecase/use-case.interface';

interface UsecaseProps {
    findUsecase: UseCaseInterface;
    generateUsecase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _findUsecase: UseCaseInterface;
    private _generateUsecase: UseCaseInterface;

    constructor(usecases: UsecaseProps) {
        this._findUsecase = usecases.findUsecase;
        this._generateUsecase = usecases.generateUsecase;
    }

    async find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return await this._findUsecase.execute(input);
    }

    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return this._generateUsecase.execute(input);
    }

}
