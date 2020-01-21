export class CreateCarDto {
    readonly id?: number;
    readonly price: number;
    readonly firstRegistrationDate: Date;
    readonly manufacturerId: string;
}
