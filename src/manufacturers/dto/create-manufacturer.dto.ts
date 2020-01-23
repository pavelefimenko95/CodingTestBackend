import { IsString, IsNumber } from 'class-validator';

export class CreateManufacturerDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly phone: string;

    @IsNumber()
    readonly siret: number;
}