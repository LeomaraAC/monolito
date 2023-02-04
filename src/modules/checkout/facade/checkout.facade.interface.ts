import {PlaceOrderFacadeInputDto, PlaceOrderFacadeOutputDto} from './dto/place-order.facade.dto';

export default interface CheckoutFacadeInterface {
    placeOrder(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderFacadeOutputDto>;
}
