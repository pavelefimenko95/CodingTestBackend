import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ManufacturersModule } from '../src/manufacturers/manufacturers.module';
import { INestApplication } from '@nestjs/common';

export default () => {
    let app: INestApplication;
    const manufacturersService = {
        findAll: () => ({
            name: 'pl',
            phone: '+302342344334',
            siret: 234234234,
        }),
        create: () => ({
            name: 'pl',
            phone: '+302342344334',
            siret: 234234234,
        }),
    };

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [ManufacturersModule],
        })
            .overrideProvider(manufacturersService)
            .useValue(manufacturersService)
            .compile();

        app = module.createNestApplication();
        await app.init();
    });

    it(`/POST manufacturers`, done => {
        const manufacturerDto = {
            id: 1,
            name: 'pl',
            phone: '+302342344334',
            siret: 234234234,
        };

        return request(app.getHttpServer())
            .post('/manufacturers')
            .send(manufacturerDto)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(({body}) => {
                expect({
                    name: body.name,
                    phone: body.phone,
                    siret: body.siret,
                }).toStrictEqual(manufacturersService.create());
            })
            .end(done);
    });

    it(`/GET manufacturers`, done => {
        return request(app.getHttpServer())
            .get('/manufacturers')
            .expect(200)
            .expect(({body}) => {
                body.forEach(({name, phone, siret}) =>
                    expect({
                        name,
                        phone,
                        siret,
                    }).toStrictEqual(manufacturersService.findAll()),
                );
            })
            .end(done);
    });

    it(`/DELETE manufacturers`, done => {
        const manufacturerToDeleteId = 1;

        return request(app.getHttpServer())
            .delete(`/manufacturers/${manufacturerToDeleteId}`)
            .expect(200)
            .end(done);
    });

    afterAll(async () => {
        await app.close();
    });
};
