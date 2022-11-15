import Product from '../../domain/product.entity';
import Id from '../../../@shared/domain/value-object/id.value-object';
import FindAllProductsUsecase from './find-all-products.usecase';
import {MockStoreCatalogRepository} from '../../@test/mock/repository.mock';

const product1 = new Product({id: new Id('1'), name: 'P1', description: 'PD1', salesPrice: 100});
const product2 = new Product({id: new Id('2'), name: 'P2', description: 'PD2', salesPrice: 200});

describe('Find all products unit test', () => {
    it('should find all products', async () => {
        const repository = MockStoreCatalogRepository();
        repository.findAll.mockReturnValue(Promise.resolve([product1, product2]));
        const usecase = new FindAllProductsUsecase(repository);
        const result = await usecase.execute();

        expect(repository.findAll).toHaveBeenCalled();
        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe(product1.id.id);
        expect(result.products[0].name).toBe(product1.name);
        expect(result.products[0].description).toBe(product1.description);
        expect(result.products[0].salesPrice).toBe(product1.salesPrice);
        expect(result.products[1].id).toBe(product2.id.id);
        expect(result.products[1].name).toBe(product2.name);
        expect(result.products[1].description).toBe(product2.description);
        expect(result.products[1].salesPrice).toBe(product2.salesPrice);
    });
});
