import Product from '../../domain/product.entity';
import Id from '../../../@shared/domain/value-object/id.value-object';
import FindProductUsecase from './find-product.usecase';

const product = new Product({
    id: new Id('1'),
    name: 'Product 1',
    description: 'Description 1',
    salesPrice: 100,
});

const MockRepository = () => {
    return {
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    };
};

describe('find a product usecase unit test', () => {
    it('should find a product', async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUsecase(productRepository);

        const result = await usecase.execute({id: product.id.id});

        expect(productRepository.find).toHaveBeenCalled();
        expect(result.id).toBe(product.id.id);
        expect(result.name).toBe(product.name);
        expect(result.description).toBe(product.description);
        expect(result.salesPrice).toBe(product.salesPrice);
    });

    it('should throw error when not found product', async () => {
        const productRepository = MockRepository();
        productRepository.find.mockRejectedValue(new Error('Product not found'));
        const usecase = new FindProductUsecase(productRepository);
        await expect(usecase.execute({id: '1'})).rejects.toThrowError('Product not found');
    });
});
