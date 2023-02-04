import express, {Request, Response} from 'express';
import CheckoutFacadeFactory from '../../../modules/checkout/factory/checkout.facade.factory';

export const checkoutRoute = express.Router();
checkoutRoute.post('/', async (req: Request, res: Response) => {
    try {
        const checkoutFacade = CheckoutFacadeFactory.create();
        const order = await checkoutFacade.placeOrder({
            clientId: req.body.clientId,
            products: req.body.products
        });
        res.status(201).send(order);
    } catch (e) {
        return res.status(500).send(e);
    }
});

