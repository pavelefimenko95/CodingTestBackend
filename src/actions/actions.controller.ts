import { Controller } from '@nestjs/common';
import { OwnersService } from '../owners/owners.service';
import { CarsService } from '../cars/cars.service';
import { Op } from 'sequelize';
import * as moment from 'moment';
import { CronJob } from 'cron';

@Controller('actions')
export class ActionsController {
    private readonly CRON_PATTERN = '0 0 * * *';

    constructor(
        private readonly ownersService: OwnersService,
        private readonly carsService: CarsService,
    ) {
        new CronJob(
            this.CRON_PATTERN,
            this.handleDeprecations.bind(this),
        ).start();
    }

    async handleDeprecations(): Promise<void> {
        const DISCOUNT = 0.8;

        await this.ownersService.delete({
            where: {
                purchaseDate: {
                    [Op.lt]: moment().subtract(18, 'months'),
                },
            },
        });
        const carsToApplyDiscount = await this.carsService.findAll({
            where: {
                firstRegistrationDate: {
                    [Op.gt]: moment().subtract(18, 'months'),
                    [Op.lt]: moment().subtract(12, 'months'),
                },
            },
        });
        await Promise.all(carsToApplyDiscount.map(car =>
            this.carsService.update({
                price: car.price * DISCOUNT,
            }, {
                where: {
                    id: car.id,
                },
            }),
        ));
        return;
    }
}
