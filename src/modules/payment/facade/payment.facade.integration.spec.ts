import {Sequelize} from 'sequelize-typescript';
import {initSequelize} from '../../@shared/test/base-test';
import TransactionModel from '../repository/transaction.model';
import PaymentFacadeFactory from '../factory/payment.facade.factory';

describe('Payment facade integration test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = await initSequelize([TransactionModel]);
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a transaction', async () => {
        const facade = PaymentFacadeFactory.create();

        const input = {
            orderId: 'order-1',
            amount: 100,
        };

        const output = await facade.process(input);

        expect(output.transactionId).toBeDefined();
        expect(output.orderId).toBe(input.orderId);
        expect(output.amount).toBe(input.amount);
        expect(output.status).toBe('approved');
    });
});
