import express, {Request, Response} from 'express';
import InvoiceFacadeFactory from '../../../modules/invoice/factory/invoice.facade.factory';

export const invoiceRoute = express.Router();
invoiceRoute.get('/:id', async (req: Request, res: Response) => {
    try {
        const invoiceFacade = InvoiceFacadeFactory.create();
        const invoice = await invoiceFacade.find({id: req.params.id});
        return res.status(200).send(invoice);
    } catch (e: any) {
        const status = e.message === 'Invoice not found' ? 404 : 500;
        return res.status(status).send(e);
    }
});
