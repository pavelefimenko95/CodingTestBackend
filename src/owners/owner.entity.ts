import { Table, Column, Model, AllowNull, NotEmpty, ForeignKey, BelongsTo, Default } from 'sequelize-typescript';
import { Car } from '../cars/car.entity';

@Table
export class Owner extends Model<Owner> {
    @NotEmpty
    @AllowNull(false)
    @Column
    name: string;

    @NotEmpty
    @AllowNull(false)
    @Column
    purchaseDate: Date;

    @Default('default')
    @Column
    addedColumn: string;

    @Default('default')
    @NotEmpty
    @AllowNull(false)
    @Column
    addedColumn2: string;

    @ForeignKey(() => Car)
    @Column
    carId: number;

    @BelongsTo(() => Car, {onDelete: 'cascade'})
    car: Car;
}
