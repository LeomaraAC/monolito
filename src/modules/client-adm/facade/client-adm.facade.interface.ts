import {AddClientFacadeInputDto} from './dto/add-client.facade.dto';
import {FindClientFacadeInputDto, FindClientFacadeOutputDto} from './dto/find-client.facade.dto';

export default interface ClientAdmFacadeInterface {
    add(input: AddClientFacadeInputDto): Promise<void>;
    find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}
