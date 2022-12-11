import AddClientUsecase from './add-client.usecase';
import {MockClientRepository} from '../../@test/mock/repository.mock';

describe('Add client use case unit test', () => {
    it('should add a client without id', async () => {
        const repository = MockClientRepository();
        const usecase = new AddClientUsecase(repository);

        const input = {
            name: 'Client 1',
            email: 'x@x.com',
            document: 'document1',
            street: 'street 1',
            number: 'number 1',
            complement: '',
            city: 'city 1',
            state: 'state 1',
            zipcode: '1234',
        };

        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.email).toEqual(input.email);
        expect(result.document).toEqual(input.document);
        expect(result.street).toEqual(input.street);
        expect(result.number).toEqual(input.number);
        expect(result.city).toEqual(input.city);
        expect(result.state).toEqual(input.state);
        expect(result.zipcode).toEqual(input.zipcode);
        expect(result.complement).toEqual(input.complement);
    });

    it('should add a client with id', async () => {
        const repository = MockClientRepository();
        const usecase = new AddClientUsecase(repository);

        const input = {
            id: '1',
            name: 'Client 1',
            email: 'x@x.com',
            document: 'document1',
            street: 'street 1',
            number: 'number 1',
            complement: '',
            city: 'city 1',
            state: 'state 1',
            zipcode: '1234',
        };

        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toEqual(input.id);
        expect(result.name).toEqual(input.name);
        expect(result.email).toEqual(input.email);
        expect(result.document).toEqual(input.document);
        expect(result.street).toEqual(input.street);
        expect(result.number).toEqual(input.number);
        expect(result.city).toEqual(input.city);
        expect(result.state).toEqual(input.state);
        expect(result.zipcode).toEqual(input.zipcode);
        expect(result.complement).toEqual(input.complement);
    });
});
