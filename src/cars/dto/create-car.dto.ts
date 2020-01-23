import { IsNumber, IsDate, IsString } from 'class-validator';

export class CreateCarDto {
    @IsNumber()
    readonly id?: number;

    @IsNumber()
    readonly price: number;

    @IsDate()
    readonly firstRegistrationDate: Date;

    @IsString()
    readonly manufacturerId: string;
}
