import CheckoutFacadeInterface from './checkout.facade.interface';
import {PlaceOrderFacadeInputDto, PlaceOrderFacadeOutputDto} from './dto/place-order.facade.dto';
import UseCaseInterface from '../../@shared/usecase/use-case.interface';

interface UsecaseProps {
    placeOrderUseCase: UseCaseInterface;
}

export default class CheckoutFacade implements CheckoutFacadeInterface {
    private _placeOrderUseCase: UseCaseInterface;

    constructor(usecases: UsecaseProps) {
        this._placeOrderUseCase = usecases.placeOrderUseCase;
    }

    async placeOrder(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderFacadeOutputDto> {
        return this._placeOrderUseCase.execute(input);
    }

}
