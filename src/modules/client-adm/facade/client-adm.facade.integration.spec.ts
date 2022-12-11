import {Sequelize} from 'sequelize-typescript';
import {initSequelize} from '../../@shared/test/base-test';
import ClientModel from '../repository/client.model';
import ClientAdmFacadeFactory from '../factory/client-adm.facade.factory';

describe('Client adm facade integration test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = await initSequelize([ClientModel]);
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a client', async () => {
        const facade = ClientAdmFacadeFactory.create();

        const input = {
            id: '1',
            name: 'Client 1',
            email: 'x@x.com',
            document: 'document 1',
            street: 'street 1',
            number: '1',
            complement: '',
            city: 'city 1',
            state: 'state 1',
            zipcode: '123'
        };

        await facade.add(input);

        const client = await ClientModel.findOne({ where: { id: '1' } });

        expect(client).toBeDefined();
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.document).toBe(input.document);
        expect(client.street).toBe(input.street);
        expect(client.number).toBe(input.number);
        expect(client.complement).toBe(input.complement);
        expect(client.city).toBe(input.city);
        expect(client.state).toBe(input.state);
        expect(client.zipcode).toBe(input.zipcode);
    });

    it('should find a client', async () => {
        const facade = ClientAdmFacadeFactory.create();

        const input = {
            id: '1',
            name: 'Client 1',
            email: 'x@x.com',
            document: 'document 1',
            street: 'street 1',
            number: '1',
            complement: '',
            city: 'city 1',
            state: 'state 1',
            zipcode: '123'
        };

        await ClientModel.create({
            id: input.id,
            name: input.name,
            email: input.email,
            document: input.document,
            street: input.street,
            number: input.number,
            complement: input.complement,
            city: input.city,
            state: input.state,
            zipcode: input.zipcode,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const client = await facade.find({ id: input.id });

        expect(client).toBeDefined();
        expect(client.id).toBe(input.id);
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.document).toBe(input.document);
        expect(client.street).toBe(input.street);
        expect(client.number).toBe(input.number);
        expect(client.complement).toBe(input.complement);
        expect(client.city).toBe(input.city);
        expect(client.state).toBe(input.state);
        expect(client.zipcode).toBe(input.zipcode);
    });
});
