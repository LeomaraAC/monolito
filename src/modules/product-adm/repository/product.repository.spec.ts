import {Sequelize} from 'sequelize-typescript';
import ProductModel from './product.model';
import Product from '../domain/product.entity';
import Id from '../../@shared/domain/value-object/id.value-object';
import ProductRepository from './product.repository';
import {initSequelize} from '../../@shared/test/base-test';

describe('Product repository unit test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = await initSequelize([ProductModel]);
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

    it('should find a product by id', async () => {
        const productProps = {
            id: '1',
            name: 'Product 1',
            description: 'Descriprion product 1',
            stock: 10,
            purchasePrice: 50,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await ProductModel.create(productProps);

        const repository = new ProductRepository();
        const product = await repository.find(productProps.id);

        expect(product.id.id).toBe(productProps.id);
        expect(product.name).toBe(productProps.name);
        expect(product.description).toBe(productProps.description);
        expect(product.stock).toBe(productProps.stock);
        expect(product.purchasePrice).toBe(productProps.purchasePrice);
    });

    it('should throw error when not found product', async () => {
        const repository = new ProductRepository();
        await expect(async () => {
            await repository.find('1');
        }).rejects.toThrowError('Product 1 not found');
    });
});
