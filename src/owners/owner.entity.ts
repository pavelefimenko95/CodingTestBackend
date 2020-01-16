import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Owner extends Model<Owner> {
    @Column
    name: string;

    @Column
    purchaseDate: string;
}