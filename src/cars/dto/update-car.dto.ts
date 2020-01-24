import { IsNumber, IsDate, IsString } from 'class-validator';

export class UpdateCarDto {
    @IsNumber()
    readonly id?: number;

    @IsNumber()
    readonly price?: number;

    @IsDate()
    readonly firstRegistrationDate?: Date;

    @IsNumber()
    readonly discount?: number;

    @IsString()
    readonly manufacturerId?: string;
}
