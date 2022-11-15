import {ProcessPaymentFacadeInputDto, ProcessPaymentFacadeOutputDto} from './dto/process-payment.facade.dto';

export default interface PaymentFacadeInterface {
    process(input: ProcessPaymentFacadeInputDto): Promise<ProcessPaymentFacadeOutputDto>;
}
