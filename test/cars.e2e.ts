import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CarsModule } from '../src/cars/cars.module';
import { INestApplication } from '@nestjs/common';

export default () => {
    let app: INestApplication;

    const dtoCommonFields = {
        price: 123,
        firstRegistrationDate: '2019-10-15T00:00:00.000Z',
    };

    const carsService = {
        findAll: () => dtoCommonFields,
        findOne: () => ({
            id: 1,
            manufacturerId: 1,
            ...dtoCommonFields,
        }),
        update: () => [1],
        create: () => ({
            id: 1,
            manufacturerId: 1,
            ...dtoCommonFields,
        }),
    };

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [CarsModule],
        })
            .overrideProvider(carsService)
            .useValue(carsService)
            .compile();

        app = module.createNestApplication();
        await app.init();
    });

    it(`/POST cars`, done => {
        const carDto = {
            id: 1,
            manufacturerId: 1,
            ...dtoCommonFields,
        };

        return request(app.getHttpServer())
            .post('/cars')
            .send(carDto)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(({body}) => {
                expect({
                    id: 2,
                    manufacturerId: body.manufacturerId,
                    price: body.price,
                    firstRegistrationDate: body.firstRegistrationDate,
                }).toStrictEqual(carsService.create());
            })
            .end(done);
    });

    it(`/GET cars`, done => {
        return request(app.getHttpServer())
            .get('/cars')
            .expect(200)
            .expect(({body}) => {
                body.forEach(({price, firstRegistrationDate}) =>
                    expect({
                        price,
                        firstRegistrationDate,
                    }).toStrictEqual(carsService.findAll()),
                );
            })
            .end(done);
    });

    it(`/GET car`, done => {
        const carToRequestId = 1;

        return request(app.getHttpServer())
            .get(`/cars/${carToRequestId}`)
            .expect(200)
            .expect(({body}) => {
                expect({
                    id: body.id,
                    manufacturerId: body.manufacturerId,
                    price: body.price,
                    firstRegistrationDate: body.firstRegistrationDate,
                }).toStrictEqual(carsService.findOne());
            })
            .end(done);
    });

    it(`/PUT car`, done => {
        const updateCarDto = {
            id: 1,
            price: 321,
        };

        return request(app.getHttpServer())
            .put(`/cars`)
            .send(updateCarDto)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(carsService.update())
            .end(done);
    });

    it(`/DELETE cars`, done => {
        const carToDeleteId = 1;

        return request(app.getHttpServer())
            .delete(`/cars/${carToDeleteId}`)
            .expect(200)
            .end(done);
    });

    afterAll(async () => {
        // mocking for the next test
        const carDto = {
            id: 1,
            manufacturerId: 1,
            ...dtoCommonFields,
        };

        await request(app.getHttpServer())
            .post('/cars')
            .send(carDto)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201);

        await app.close();
    });
};
