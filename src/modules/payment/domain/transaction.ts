import BaseEntity from '../../@shared/domain/entity/base.entity';
import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface';
import Id from '../../@shared/domain/value-object/id.value-object';

type TransactionProps = {
    id?: Id;
    amount: number;
    orderId: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export default class Transaction extends BaseEntity implements AggregateRoot {
    private _amount: number;
    private _orderId: string;
    private _status: string;

    constructor(props: TransactionProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._amount = props.amount;
        this._orderId = props.orderId;
        this._status = props.status || 'pending';
        this.validate();
    }

    get amount(): number {
        return this._amount;
    }

    get orderId(): string {
        return this._orderId;
    }

    get status(): string {
        return this._status;
    }

    validate() {
        if (this._amount <= 0) {
            throw new Error('Amount must be grater then 0');
        }
    }

    process() {
        if (this._amount >= 100) {
            this.approve();
        } else {
            this.decline();
        }
    }

    private approve() {
        this._status = 'approved';
    }

    private decline() {
        this._status = 'declined';
    }
}
