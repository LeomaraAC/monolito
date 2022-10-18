import ProductGateway from '../gateway/product.gateway';
import Product from '../domain/product.entity';
import ProductModel from './product.model';

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

    find(id: string): Promise<Product> {
        return Promise.resolve(undefined);
    }

}
