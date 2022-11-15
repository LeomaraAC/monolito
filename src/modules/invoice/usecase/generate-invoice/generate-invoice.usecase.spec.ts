import {MockInvoiceRepository} from '../../@test/mock/repository.mock';
import GenerateInvoiceUsecase from './generate-invoice.usecase';
import {GenerateInvoiceUseCaseInputDto} from './generate-invoice.dto';

describe('generate invoice usecase unit test', () => {
    it('should generate a new invoice', async () => {
        const repository = MockInvoiceRepository();
        const usecase = new GenerateInvoiceUsecase(repository);
        const input: GenerateInvoiceUseCaseInputDto = {
            name: 'Invoice 1',
            document: 'Document 1',
            city: 'City A',
            number: '1A',
            state: 'State A',
            street: 'Street A',
            zipCode: 'Zip A',
            complement: 'Complement A',
            items: [
                {
                    id: '1',
                    name: 'Product 1',
                    price: 100
                }
            ]
        };
        const result = await usecase.execute(input);
        expect(repository.save).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.complement).toBe(input.complement);
        expect(result.zipCode).toBe(input.zipCode);
        expect(result.street).toBe(input.street);
        expect(result.city).toBe(input.city);
        expect(result.number).toBe(input.number);
        expect(result.state).toBe(input.state);
        expect(result.total).toBe(100);
        expect(result.items.length).toBe(input.items.length);
        expect(result.items).toEqual(input.items);
    });
});
