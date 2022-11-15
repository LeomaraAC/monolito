import Transaction from '../../domain/transaction';
import Id from '../../../@shared/domain/value-object/id.value-object';
import ProcessPaymentUseCase from './process-payment.usecase';
import {MockPaymentRepository} from '../../@test/mock/repository.mock';

const transactionApproved = new Transaction({
    id: new Id('1'),
    amount: 100,
    orderId: '1',
    status: 'approved',
});

const transactionDeclined = new Transaction({
    id: new Id('1'),
    amount: 50,
    orderId: '1',
    status: 'declined',
});

describe('Process payment usecase unit test', () => {
    it('should approve a transaction', async () => {
        const paymentRepository = MockPaymentRepository();
        paymentRepository.save.mockReturnValue(Promise.resolve(transactionApproved));
        const usecase = new ProcessPaymentUseCase(paymentRepository);
        const input = {
            orderId: '1',
            amount: 100,
        };

        const result = await usecase.execute(input);

        expect(result.transactionId).toBe(transactionApproved.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe('approved');
        expect(result.amount).toBe(100);
        expect(result.orderId).toBe('1');
        expect(result.createdAt).toBe(transactionApproved.createdAt);
        expect(result.updatedAt).toBe(transactionApproved.updatedAt);
    });

    it('should decline a transaction', async () => {
        const paymentRepository = MockPaymentRepository();
        paymentRepository.save.mockReturnValue(Promise.resolve(transactionDeclined));
        const usecase = new ProcessPaymentUseCase(paymentRepository);
        const input = {
            orderId: '1',
            amount: 50,
        };

        const result = await usecase.execute(input);

        expect(result.transactionId).toBe(transactionDeclined.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe('declined');
        expect(result.amount).toBe(50);
        expect(result.orderId).toBe('1');
        expect(result.createdAt).toBe(transactionDeclined.createdAt);
        expect(result.updatedAt).toBe(transactionDeclined.updatedAt);
    });
});
