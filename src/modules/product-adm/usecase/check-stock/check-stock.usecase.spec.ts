import Product from '../../domain/product.entity';
import Id from '../../../@shared/domain/value-object/id.value-object';
import CheckStockUsecase from './check-stock.usecase';
import {MockProductRepository} from '../../@test/mock/repository.mock';

const product = new Product({
    id: new Id('1'),
    name: 'Product 1',
    description: 'Product 1 description',
    purchasePrice: 10,
    stock: 10,
});
//
// const mockRepository = () => {
//     return {
//         add: jest.fn(),
//         find: jest.fn().mockReturnValue(Promise.resolve(product))
//     };
// };

describe('Check stock use case unit test', () => {
    it('should get the stock', async () => {
        const repository = MockProductRepository();
        repository.find.mockReturnValue(Promise.resolve(product));
        const usecase = new CheckStockUsecase(repository);
        const output = await usecase.execute({productId: product.id.id});
        expect(repository.find).toBeCalled();
        expect(output.stock).toBe(product.stock);
        expect(output.productId).toBe(product.id.id);
    });

    it('should throw error when not found product', () => {
        const errorMessage = `Product ${product.id.id} not found`;
        const repository = MockProductRepository();
        repository.find.mockRejectedValue(new Error(errorMessage));
        const usecase = new CheckStockUsecase(repository);
        expect(usecase.execute({productId: product.id.id})).rejects.toThrowError(errorMessage);
    });
});
