import {Sequelize} from 'sequelize-typescript';
import {initSequelize} from '../../@shared/test/base-test';
import ProductModel from './product.model';
import ProductRepository from './product.repository';

describe('Product repository test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = await initSequelize([ProductModel]);
        await ProductModel.create({
            id: '1',
            name: 'Product 1',
            description: 'Description 1',
            salesPrice: 100,
        });
        await ProductModel.create({
            id: '2',
            name: 'Product 2',
            description: 'Description 2',
            salesPrice: 200,
        });
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should find all products', async () => {
        const productRepository = new ProductRepository();
        const products = await productRepository.findAll();

        expect(products.length).toBe(2);
        expect(products[0].id.id).toBe('1');
        expect(products[0].name).toBe('Product 1');
        expect(products[0].description).toBe('Description 1');
        expect(products[0].salesPrice).toBe(100);
        expect(products[1].id.id).toBe('2');
        expect(products[1].name).toBe('Product 2');
        expect(products[1].description).toBe('Description 2');
        expect(products[1].salesPrice).toBe(200);
    });

    it('should find a product by id', async () => {
        const productRepository = new ProductRepository();
        const product = await productRepository.find('1');

        expect(product.id.id).toBe('1');
        expect(product.name).toBe('Product 1');
        expect(product.description).toBe('Description 1');
        expect(product.salesPrice).toBe(100);
    });

    it('should throw an error when not found product', async () => {
        const productRepository = new ProductRepository();
        await expect(productRepository.find('nf1')).rejects.toThrowError('Product not found');
    });
});
