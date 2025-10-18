import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { TableColumn } from './column.model';
import { Row } from './row.model';
import { User } from './user.model';

@Table({
    tableName: 'tables',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})
export class DataTable extends Model<DataTable> {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    user_id: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
    })
    name: string; // e.g. "My Product Inventory", "Employee Records"

    @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
    user: User;

    @HasMany(() => TableColumn, { foreignKey: 'table_id', as: 'columns' })
    columns: TableColumn[];

    @HasMany(() => Row, { foreignKey: 'table_id', as: 'rows' })
    rows: Row[];
}
