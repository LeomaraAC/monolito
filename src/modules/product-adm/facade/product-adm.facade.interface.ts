import {AddProductFacadeInputDto} from './dto/add-product.facade.dto';
import {CheckStockFacadeInputDto, CheckStockFacadeOutputDto} from './dto/check-stock.facade.dto';

export default interface ProductAdmFacadeInterface {
    addProduct(input: AddProductFacadeInputDto): Promise<void>;
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>;
}
