import UseCaseInterface from '../../../@shared/usecase/use-case.interface';
import {FindClientInputDto, FindClientOutputDto} from './find-client.dto';
import ClientGateway from '../../gateway/client.gateway';

export default class FindClientUsecase implements UseCaseInterface {

    constructor(private _clientRepository: ClientGateway) {
    }

    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
        const client = await this._clientRepository.find(input.id);
        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            street: client.street,
            number: client.number,
            complement: client.complement,
            city: client.city,
            state: client.state,
            zipcode: client.zipcode,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        };
    }

}
