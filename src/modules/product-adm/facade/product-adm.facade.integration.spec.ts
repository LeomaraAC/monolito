import {Sequelize} from 'sequelize-typescript';
import ProductModel from '../repository/product.model';
import ProductAdmFacadeFactory from '../factory/product-adm.facade.factory';
import {initSequelize} from '../../@shared/test/base-test';

describe('Product adm facade integration test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = await initSequelize([ProductModel]);
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should add a new product', async () => {
        const facade = ProductAdmFacadeFactory.create();
        const input = {
            id: '1',
            name: 'Product 1',
            description: 'Product 1 description',
            purchasePrice: 10,
            stock: 10,
        };

        await facade.addProduct(input);

        const product = await ProductModel.findOne({ where: { id: '1' } });
        expect(product).toBeDefined();
        expect(product.id).toBe(input.id);
        expect(product.name).toBe(input.name);
        expect(product.description).toBe(input.description);
        expect(product.purchasePrice).toBe(input.purchasePrice);
        expect(product.stock).toBe(input.stock);
    });

    it('should check product stock', async () => {
        const productFacade = ProductAdmFacadeFactory.create();
        const input = {
            id: '1',
            name: 'Product 1',
            description: 'Product 1 description',
            purchasePrice: 10,
            stock: 10,
        };
        await productFacade.addProduct(input);

        const result = await productFacade.checkStock({ productId: '1' });

        expect(result.productId).toBe(input.id);
        expect(result.stock).toBe(input.stock);
    });
});
