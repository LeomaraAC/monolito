import {AddProductInputDto} from './add-product.dto';
import AddProductUsecase from './add-product.usecase';

const mockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    };
};

describe('Add product use case unit test', () => {
    it('should add a new product', async () => {
        const input: AddProductInputDto = {
            name: 'Product 1',
            description: 'Product 1 description',
            stock: 5,
            purchasePrice: 140
        };
        const repository = mockRepository();
        const usecase = new AddProductUsecase(repository);
        const output = await usecase.execute(input);

        expect(repository.add).toBeCalled();
        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.description).toBe(input.description);
        expect(output.stock).toBe(input.stock);
        expect(output.purchasePrice).toBe(input.purchasePrice);
    });
});
