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

@Table({
    tableName: 'rows',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})
export class Row extends Model<Row> {
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

    @BelongsTo(() => DataTable, { foreignKey: 'table_id', as: 'table' })
    table: DataTable;

    @HasMany(() => CellValue, { foreignKey: 'row_id', as: 'cells' })
    cells: CellValue[];
}
