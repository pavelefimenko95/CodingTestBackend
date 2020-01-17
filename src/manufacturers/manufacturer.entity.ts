import { Table, Column, AllowNull, NotEmpty, Model, HasMany } from 'sequelize-typescript';
import { Car } from '../cars/car.entity';

@Table
export class Manufacturer extends Model<Manufacturer> {
    @NotEmpty
    @AllowNull(false)
    @Column
    name: string;

    @NotEmpty
    @AllowNull(false)
    @Column
    phone: string;

    @NotEmpty
    @AllowNull(false)
    @Column
    siret: number;

    @HasMany(() => Car)
    cars: Car[];
}