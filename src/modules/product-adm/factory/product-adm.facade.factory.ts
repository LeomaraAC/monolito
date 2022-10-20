import ProductRepository from '../repository/product.repository';
import AddProductUsecase from '../usecase/add-product/add-product.usecase';
import ProductAdmFacade from '../facade/product-adm.facade';
import CheckStockUsecase from '../usecase/check-stock/check-stock.usecase';

export default class ProductAdmFacadeFactory {
    static create() {
        const repository = new ProductRepository();
        const addProductUsecase = new AddProductUsecase(repository);
        const checkStockUseCase = new CheckStockUsecase(repository);
        return new ProductAdmFacade({
            addUseCase: addProductUsecase,
            stockUseCase: checkStockUseCase
        });
    }
}
