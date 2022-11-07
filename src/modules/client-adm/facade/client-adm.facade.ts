import ClientAdmFacadeInterface from './client-adm.facade.interface';
import {AddClientFacadeInputDto} from './dto/add-client.facade.dto';
import {FindClientFacadeInputDto, FindClientFacadeOutputDto} from './dto/find-client.facade.dto';
import UseCaseInterface from '../../@shared/usecase/use-case.interface';
import {FindClientInputDto, FindClientOutputDto} from '../usecase/find-client/find-client.dto';
import {AddClientInputDto, AddClientOutputDto} from '../usecase/add-client/add-client.dto';

interface UsecaseProps {
    findUsecase: UseCaseInterface<FindClientInputDto, FindClientOutputDto>;
    addUsecase: UseCaseInterface<AddClientInputDto, AddClientOutputDto>;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
    private _findUsecase: UseCaseInterface<FindClientInputDto, FindClientOutputDto>;
    private _addUsecase: UseCaseInterface<AddClientInputDto, AddClientOutputDto>;


    constructor(props: UsecaseProps) {
        this._findUsecase = props.findUsecase;
        this._addUsecase = props.addUsecase;
    }

    async add(input: AddClientFacadeInputDto): Promise<void> {
        await this._addUsecase.execute(input);
    }

    async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return await this._findUsecase.execute(input);
    }

}
