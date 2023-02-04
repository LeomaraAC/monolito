import PlaceOrderUsecase from '../usecase/place-order/place-order.usecase';
import CheckoutFacade from '../facade/checkout.facade';
import ClientAdmFacadeFactory from '../../client-adm/factory/client-adm.facade.factory';
import ProductAdmFacadeFactory from '../../product-adm/factory/product-adm.facade.factory';
import StoreCatalogFacadeFactory from '../../store-catalog/factory/store-catalog.facade.factory';
import InvoiceFacadeFactory from '../../invoice/factory/invoice.facade.factory';
import PaymentFacadeFactory from '../../payment/factory/payment.facade.factory';
import CheckoutRepository from '../repository/checkout.repository';

export default class CheckoutFacadeFactory {
    static create() {
        const clientFacade = ClientAdmFacadeFactory.create();
        const productFacade = ProductAdmFacadeFactory.create();
        const catalogFacade = StoreCatalogFacadeFactory.create();
        const invoiceFacade = InvoiceFacadeFactory.create();
        const paymentFacade = PaymentFacadeFactory.create();
        const checkoutRepository = new CheckoutRepository();
        const usecase = new PlaceOrderUsecase(
            clientFacade, productFacade, catalogFacade, checkoutRepository, invoiceFacade, paymentFacade
        );
        return new CheckoutFacade({placeOrderUseCase: usecase});
    }
}
