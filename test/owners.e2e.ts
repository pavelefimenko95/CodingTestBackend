import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { OwnersModule } from '../src/owners/owners.module';
import { INestApplication } from '@nestjs/common';

export default () => {
    let app: INestApplication;

    const dtoCommonFields = {
        name: 'pavel',
        purchaseDate: '2019-10-15T00:00:00.000Z',
    };

    const ownersService = {
        findAll: () => dtoCommonFields,
        create: () => ({
            id: 1,
            carId: 1,
            ...dtoCommonFields,
        }),
    };

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [OwnersModule],
        })
            .overrideProvider(ownersService)
            .useValue(ownersService)
            .compile();

        app = module.createNestApplication();
        await app.init();
    });

    it(`/POST owners`, done => {
        const ownerDto = {
            id: 1,
            carId: 1,
            ...dtoCommonFields,
        };

        return request(app.getHttpServer())
            .post('/owners')
            .send(ownerDto)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(({body}) => {
                expect({
                    id: body.id,
                    carId: body.carId,
                    name: body.name,
                    purchaseDate: body.purchaseDate,
                }).toStrictEqual(ownersService.create());
            })
            .end(done);
    });

    it(`/GET owners`, done => {
        return request(app.getHttpServer())
            .get('/owners')
            .expect(200)
            .expect(({body}) => {
                body.forEach(({name, purchaseDate}) =>
                    expect({
                        name,
                        purchaseDate,
                    }).toStrictEqual(ownersService.findAll()),
                );
            })
            .end(done);
    });

    it(`/DELETE owners`, done => {
        const ownerToDeleteId = 1;

        return request(app.getHttpServer())
            .delete(`/owners/${ownerToDeleteId}`)
            .expect(200)
            .end(done);
    });

    afterAll(async () => {
        await app.close();
    });
};
