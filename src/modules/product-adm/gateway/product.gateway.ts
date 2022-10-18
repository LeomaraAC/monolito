import GatewayInterface from '../../@shared/gateway/gateway.interface';
import Product from '../domain/product.entity';

export default interface ProductGateway extends GatewayInterface<Product> {}
