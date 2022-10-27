import {FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto} from './dto/find-store-catalog.facade.dto';
import {FindAllStoreCatalogFacadeOutputDto} from './dto/find-all-store-catalog.facade.dto';

export default interface StoreCatalogFacadeInterface {
    find(input: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto>;
    findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>;
}
