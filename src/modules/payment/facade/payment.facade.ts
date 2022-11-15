import PaymentFacadeInterface from './payment.facade.interface';
import {ProcessPaymentFacadeInputDto, ProcessPaymentFacadeOutputDto} from './dto/process-payment.facade.dto';
import UseCaseInterface from '../../@shared/usecase/use-case.interface';

export default class PaymentFacade implements PaymentFacadeInterface {

    constructor(private processPaymentUseCase: UseCaseInterface) {}

    process(input: ProcessPaymentFacadeInputDto): Promise<ProcessPaymentFacadeOutputDto> {
        return this.processPaymentUseCase.execute(input);
    }
}
