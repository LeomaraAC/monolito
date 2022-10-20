import ProductAdmFacadeInterface from './product-adm.facade.interface';
import {AddProductFacadeInputDto} from './dto/add-product.facade.dto';
import {CheckStockFacadeInputDto, CheckStockFacadeOutputDto} from './dto/check-stock.facade.dto';
import UseCaseInterface from '../../@shared/usecase/use-case.interface';
import {AddProductInputDto, AddProductOutputDto} from '../usecase/add-product/add-product.dto';
import {CheckStockInputDto, CheckStockOutputDto} from '../usecase/check-stock/check-stock.dto';

export interface UseCasesProps {
    addUseCase: UseCaseInterface<AddProductInputDto, AddProductOutputDto>;
    stockUseCase: UseCaseInterface<CheckStockInputDto, CheckStockOutputDto>;
}


export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addUseCase: UseCaseInterface<AddProductInputDto, AddProductOutputDto>;
    private _stockUseCase: UseCaseInterface<CheckStockInputDto, CheckStockOutputDto>;


    constructor(props: UseCasesProps) {
        this._addUseCase = props.addUseCase;
        this._stockUseCase = props.stockUseCase;
    }

    async addProduct(input: AddProductFacadeInputDto): Promise<void> {
        await this._addUseCase.execute(input);
    }

    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._stockUseCase.execute(input);
    }
}
