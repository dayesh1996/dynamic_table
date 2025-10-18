import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { Row } from './row.model';
import { TableColumn } from './column.model';

@Table({
    tableName: 'cell_values',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})
export class CellValue extends Model<CellValue> {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @ForeignKey(() => Row)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    row_id: string;

    @ForeignKey(() => TableColumn)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    column_id: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    value_text: string;

    @Column({
        type: DataType.DECIMAL,
        allowNull: true,
    })
    value_number: number;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    value_datetime: Date;

    @Column({
        type: DataType.JSONB,
        allowNull: true,
    })
    value_array: string[];

    @BelongsTo(() => Row, { foreignKey: 'row_id', as: 'row' })
    row: Row;

    @BelongsTo(() => TableColumn, { foreignKey: 'column_id', as: 'column' })
    column: TableColumn;
}
