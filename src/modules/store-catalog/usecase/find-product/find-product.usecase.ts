import UseCaseInterface from '../../../@shared/usecase/use-case.interface';
import {FindProductInputDto, FindProductOutputDto} from './find-product.dto';
import ProductGateway from '../../gateway/product.gateway';

export default class FindProductUsecase implements UseCaseInterface<FindProductInputDto, FindProductOutputDto> {
    constructor(private _productRepository: ProductGateway) {
    }

    async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
        const product = await this._productRepository.find(input.id);
        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        };
    }

}
