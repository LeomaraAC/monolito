import ProductGateway from '../gateway/product.gateway';
import Product from '../domain/product.entity';
import ProductModel from './product.model';
import Id from '../../@shared/domain/value-object/id.value-object';

export default class ProductRepository implements ProductGateway {
    async find(id: string): Promise<Product> {
        try {
            const product = await ProductModel.findOne({where: {id}, rejectOnEmpty: true});
            return this.modelToProduct(product);
        } catch (e) {
            throw new Error('Product not found');
        }
    }

    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll();
        return products.map(product => this.modelToProduct(product));
    }

    private modelToProduct(model: ProductModel): Product {
        return new Product({
            id: new Id(model.id),
            name: model.name,
            description: model.description,
            salesPrice: model.salesPrice
        });
    }

}
