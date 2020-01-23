import { Table, Column, Model, AllowNull, NotEmpty, ForeignKey, BelongsTo } from 'sequelize-typescript';
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

    @ForeignKey(() => Car)
    @Column
    carId: number;

    @BelongsTo(() => Car, {onDelete: 'cascade'})
    car: Car;
}
