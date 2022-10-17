import Id from '../value-object/id.value-object';

export default class BaseEntity {
    private readonly _id: Id;
    private readonly _createdAt: Date;
    private _updatedAt: Date;

    constructor(id?: Id, createdAt?: Date, updatedAt?: Date) {
        this._id = id || new Id();
        this._createdAt = new Date() || createdAt;
        this._updatedAt = new Date() || updatedAt;
    }


    get id(): Id {
        return this._id;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    set updatedAt(value: Date) {
        this._updatedAt = value;
    }
}
