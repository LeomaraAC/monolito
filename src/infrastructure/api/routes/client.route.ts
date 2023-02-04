import express, {Request, Response} from 'express';
import ClientAdmFacadeFactory from '../../../modules/client-adm/factory/client-adm.facade.factory';

export const clientRoute = express.Router();
clientRoute.post('/', async (req: Request, res: Response) => {
    try {
        const clientAdmFacade = ClientAdmFacadeFactory.create();
        const data = req.body;
        await clientAdmFacade.add({
            id: data.id,
            name: data.name,
            email: data.email,
            document: data.document,
            street: data.street,
            number: data.number,
            complement: data.complement,
            city: data.city,
            state: data.street,
            zipcode: data.zipcode
        });
        return res.status(201).send();
    } catch (e) {
        return res.status(500).send(e);
    }
});
