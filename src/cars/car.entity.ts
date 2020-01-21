import { Table, Column, Model, AllowNull, NotEmpty, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { Manufacturer } from '../manufacturers/manufacturer.entity';
import { Owner } from '../owners/owner.entity';

@Table
export class Car extends Model<Car> {
    @NotEmpty
    @AllowNull(false)
    @Column
    price: number;

    @NotEmpty
    @AllowNull(false)
    @Column
    firstRegistrationDate: Date;

    @HasMany(() => Owner, {onDelete: 'CASCADE'})
    owners: Owner[];

    @ForeignKey(() => Manufacturer)
    @Column
    manufacturerId: number;

    @BelongsTo(() => Manufacturer)
    manufacturer: Manufacturer;
}
