import {Sequelize} from 'sequelize-typescript';
import {initSequelize} from '../../@shared/test/base-test';
import Client from '../domain/client.entity';
import Id from '../../@shared/domain/value-object/id.value-object';
import ClientRepository from './client.repository';
import ClientModel from './client.model';

describe('client repository unit test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = await initSequelize([ClientModel]);
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a client', async () => {
        const client = new Client({
            id: new Id('1'),
            name: 'Client 1',
            email: 'x@x.com',
            document: 'document 1',
            street: 'street 1',
            number: '1',
            complement: '',
            city: 'city 1',
            state: 'state 1',
            zipcode: '123'
        });

        const repository = new ClientRepository();
        await repository.add(client);

        const clientDb = await ClientModel.findOne({ where: { id: client.id.id } });

        expect(clientDb).toBeDefined();
        expect(clientDb.id).toBe(client.id.id);
        expect(clientDb.name).toBe(client.name);
        expect(clientDb.email).toBe(client.email);
        expect(clientDb.document).toBe(client.document);
        expect(clientDb.street).toBe(client.street);
        expect(clientDb.number).toBe(client.number);
        expect(clientDb.complement).toBe(client.complement);
        expect(clientDb.city).toBe(client.city);
        expect(clientDb.state).toBe(client.state);
        expect(clientDb.zipcode).toBe(client.zipcode);
        expect(clientDb.createdAt).toStrictEqual(client.createdAt);
        expect(clientDb.updatedAt).toStrictEqual(client.updatedAt);
    });

    it('should find a client', async () => {
        const client = await ClientModel.create({
            id: '1',
            name: 'Client 1',
            email: 'x@x.com',
            document: 'document 1',
            street: 'street 1',
            number: '1',
            complement: '',
            city: 'city 1',
            state: 'state 1',
            zipcode: '123',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const repository = new ClientRepository();
        const result = await repository.find(client.id);

        expect(result.id.id).toEqual(client.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.document).toBe(client.document);
        expect(result.street).toBe(client.street);
        expect(result.number).toBe(client.number);
        expect(result.complement).toBe(client.complement);
        expect(result.city).toBe(client.city);
        expect(result.state).toBe(client.state);
        expect(result.zipcode).toBe(client.zipcode);
    });
});
