export class CreateCarDto {
    readonly id?: number;
    readonly manufacturer: string;
    readonly price: number;
    readonly firstRegistractionDate: Date;
    readonly manufacturerId: string;
}
