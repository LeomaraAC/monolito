import ValueObject from '../../@shared/domain/value-object/value-object.interface';

type AddressProps = {
    street: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
    zipCode: string;
};

export default class Address implements ValueObject {
    private readonly _street: string;
    private readonly _number: string;
    private readonly _complement?: string;
    private readonly _city: string;
    private readonly _state: string;
    private readonly _zipCode: string;

    constructor(props: AddressProps) {
        this._street = props.street;
        this._number = props.number;
        this._complement = props.complement || '';
        this._city = props.city;
        this._state = props.state;
        this._zipCode = props.zipCode;
    }

    get street(): string {
        return this._street;
    }

    get number(): string {
        return this._number;
    }

    get complement(): string {
        return this._complement;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get zipCode(): string {
        return this._zipCode;
    }
}
