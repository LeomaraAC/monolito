import UseCaseInterface from '../../../@shared/usecase/use-case.interface';
import ProductGateway from '../../gateway/product.gateway';
import {CheckStockInputDto, CheckStockOutputDto} from './check-stock.dto';

export default class CheckStockUsecase implements UseCaseInterface {
    private _repository: ProductGateway;

    constructor(repository: ProductGateway) {
        this._repository = repository;
    }

    async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
        const product = await this._repository.find(input.productId);
        return {
            productId: product.id.id,
            stock: product.stock
        };
    }

}
