import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CarsModule } from '../src/cars/cars.module';
import { INestApplication } from '@nestjs/common';

export default () => {
    let app: INestApplication;
    const carsService = {
        findAll: () => ({
            price: 123,
            firstRegistrationDate: '2019-10-15T00:00:00.000Z',
        }),
        findOne: () => ({
            price: 123,
            firstRegistrationDate: '2019-10-15T00:00:00.000Z',
        }),
        update: () => [1],
        create: () => ({
            price: 123,
            firstRegistrationDate: '2019-10-15T00:00:00.000Z',
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
            price: 123,
            firstRegistrationDate: '2019-10-15T00:00:00.000Z',
        };

        return request(app.getHttpServer())
            .post('/cars')
            .send(carDto)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(({body}) => {
                expect({
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
                    price: body.price,
                    firstRegistrationDate: body.firstRegistrationDate,
                }).toStrictEqual(carsService.findOne());
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
            firstRegistrationDate: '2019-10-15T00:00:00.000Z',
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
        await app.close();
    });
};
