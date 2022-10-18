import ProductGateway from '../gateway/product.gateway';
import Product from '../domain/product.entity';
import ProductModel from './product.model';
import Id from '../../@shared/domain/value-object/id.value-object';

export default class ProductRepository implements ProductGateway {
    async add(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id.id,
            name: entity.name,
            description: entity.description,
            stock: entity.stock,
            purchasePrice: entity.purchasePrice,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

    async find(id: string): Promise<Product> {
        const product = await ProductModel.findOne({where: {id}});
        if (!product) {
            throw new Error(`Product ${id} not found`);
        }

        return new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            stock: product.stock,
            purchasePrice: product.purchasePrice,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        });
    }

}
