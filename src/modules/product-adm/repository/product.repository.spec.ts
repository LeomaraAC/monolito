import {Sequelize} from 'sequelize-typescript';
import ProductModel from './product.model';
import Product from '../domain/product.entity';
import Id from '../../@shared/domain/value-object/id.value-object';
import ProductRepository from './product.repository';

describe('Product repository unit test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            logging: false,
            dialect: 'sqlite',
            storage: ':memory:',
            sync: {force: true}
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a new product', async () => {
        const product = new Product({
            id: new Id('1'),
            name: 'Product 1',
            description: 'Descriprion product 1',
            stock: 10,
            purchasePrice: 50
        });
        const repository = new ProductRepository();
        await repository.add(product);

        const productDb = await ProductModel.findOne({where: {id: product.id.id}});

        expect(productDb.id).toBe(product.id.id);
        expect(productDb.name).toBe(product.name);
        expect(productDb.description).toBe(product.description);
        expect(productDb.stock).toBe(product.stock);
        expect(productDb.purchasePrice).toBe(product.purchasePrice);
    });
});
