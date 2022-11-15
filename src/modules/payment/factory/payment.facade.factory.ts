import PaymentFacadeInterface from '../facade/payment.facade.interface';
import TransactionRepostiory from '../repository/transaction.repository';
import ProcessPaymentUseCase from '../usecase/process-payment/process-payment.usecase';
import PaymentFacade from '../facade/payment.facade';

export default class PaymentFacadeFactory {
    static create(): PaymentFacadeInterface {
        const repository = new TransactionRepostiory();
        const usecase = new ProcessPaymentUseCase(repository);
        return new PaymentFacade(usecase);
    }
}
