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
            address: 'Address 1',
        };

        await facade.add(input);

        const client = await ClientModel.findOne({ where: { id: '1' } });

        expect(client).toBeDefined();
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.address).toBe(input.address);
    });

    it('should find a client', async () => {
        const facade = ClientAdmFacadeFactory.create();

        const input = {
            id: '1',
            name: 'Client 1',
            email: 'x@x.com',
            address: 'Address 1',
        };

        await ClientModel.create({
            id: input.id,
            name: input.name,
            email: input.email,
            address: input.address,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const client = await facade.find({ id: input.id });

        expect(client).toBeDefined();
        expect(client.id).toBe(input.id);
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.address).toBe(input.address);
    });
});
