import ProductRepository from '../repository/product.repository';
import FindAllProductsUsecase from '../usecase/find-all-products/find-all-products.usecase';
import FindProductUsecase from '../usecase/find-product/find-product.usecase';
import StoreCatalogFacadeInterface from '../facade/store-catalog.facade.interface';
import StoreCatalogFacade from '../facade/store-catalog.facade';

export default class StoreCatalogFacadeFactory {

    static create(): StoreCatalogFacadeInterface {
        const repository = new ProductRepository();
        const findAllUseCase = new FindAllProductsUsecase(repository);
        const findUseCase = new FindProductUsecase(repository);
        return new StoreCatalogFacade({findUseCase, findAllUseCase});
    }
}
