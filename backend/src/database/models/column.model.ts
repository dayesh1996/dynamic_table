import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import { DataTable } from './table.model';
import { CellValue } from './cell.model';

export enum column_data_type {
    text = 'text',
    number = 'number',
    datetime = 'datetime',
    dropdown_single = 'dropdown_single',
    dropdown_multiple = 'dropdown_multiple',
}

@Table({
    tableName: 'columns',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})
export class TableColumn extends Model<TableColumn> {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @ForeignKey(() => DataTable)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    table_id: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.ENUM(...Object.values(column_data_type)),
        allowNull: false,
    })
    data_type: column_data_type;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    position: number;

    @Column({
        type: DataType.JSONB,
        allowNull: true,
    })
    dropdown_options: string[];

    @BelongsTo(() => DataTable, { foreignKey: 'table_id', as: 'table' })
    table: DataTable;

    @HasMany(() => CellValue, { foreignKey: 'column_id', as: 'cells' })
    cells: CellValue[];
}
