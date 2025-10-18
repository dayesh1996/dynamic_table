import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
    Unique,
} from 'sequelize-typescript';
import { DataTable } from './table.model';

@Table({
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})
export class User extends Model<User> {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @Unique
    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    password: string; // hashed password

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    name: string;

    @HasMany(() => DataTable, { foreignKey: 'user_id', as: 'tables' })
    tables: DataTable[];
}
