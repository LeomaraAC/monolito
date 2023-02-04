import express, {Request, Response} from 'express';
import ProductAdmFacadeFactory from '../../../modules/product-adm/factory/product-adm.facade.factory';

export const productRoute = express.Router();
productRoute.post('/', async (req: Request, res: Response) => {
    try {
        const productAdmFacade = ProductAdmFacadeFactory.create();
        const data = req.body;
        await productAdmFacade.addProduct({
            id: data.id,
            name: data.name,
            description: data.description,
            stock: data.stock,
            purchasePrice: data.purchasePrice
        });
        return res.status(201).send();
    } catch (e) {
        return res.status(500).send(e);
    }
});
