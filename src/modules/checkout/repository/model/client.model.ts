import {Column, Model, PrimaryKey, Table} from 'sequelize-typescript';

@Table({
    tableName: 'clients',
    timestamps: false
})
export default class ClientModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @Column({allowNull: false})
    name: string;

    @Column({allowNull: false})
    email: string;

    @Column({allowNull: false, field: 'street'})
    address: string;
}
