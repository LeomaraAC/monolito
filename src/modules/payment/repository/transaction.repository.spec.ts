import {Sequelize} from 'sequelize-typescript';
import {initSequelize} from '../../@shared/test/base-test';
import TransactionModel from './transaction.model';
import Transaction from '../domain/transaction';
import Id from '../../@shared/domain/value-object/id.value-object';
import TransactionRepostiory from './transaction.repository';


describe('transaction repository unit test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = await initSequelize([TransactionModel]);
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should save a transaction', async () => {
        const transaction = new Transaction({
            id: new Id('1'),
            amount: 100,
            orderId: '1',
            status: 'approved'
        });

        const repository = new TransactionRepostiory();
        const result = await repository.save(transaction);

        expect(result.id.id).toBe(transaction.id.id);
        expect(result.status).toBe('approved');
        expect(result.amount).toBe(transaction.amount);
        expect(result.orderId).toBe(transaction.orderId);
    });
});
