import FindClientUsecase from './find-client.usecase';
import Client from '../../domain/client.entity';
import Id from '../../../@shared/domain/value-object/id.value-object';
import {MockClientRepository} from '../../@test/mock/repository.mock';

const client = new Client({
    id: new Id('1'),
    name: 'Client 1',
    email: 'x@x.com',
    address: 'Address 1',
});

describe('Find client use case unit test', () => {
    it('should find a client', async () => {
        const repository = MockClientRepository();
        repository.find.mockReturnValue(Promise.resolve(client));
        const usecase = new FindClientUsecase(repository);

        const result = await usecase.execute({id: client.id.id});

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toEqual(client.id.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.address).toEqual(client.address);
        expect(result.createdAt).toEqual(client.createdAt);
        expect(result.updatedAt).toEqual(client.updatedAt);
    });
});
