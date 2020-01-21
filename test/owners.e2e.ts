import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { OwnersModule } from '../src/owners/owners.module';
import { INestApplication } from '@nestjs/common';

export default () => {
    let app: INestApplication;
    const ownersService = {
        findAll: () => ({
            name: 'pavel',
            purchaseDate: '2019-10-15T00:00:00.000Z',
        }),
        create: () => ({
            name: 'pavel',
            purchaseDate: '2019-10-15T00:00:00.000Z',
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
            name: 'pavel',
            purchaseDate: '2019-10-15T00:00:00.000Z',
        };

        return request(app.getHttpServer())
            .post('/owners')
            .send(ownerDto)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(({body}) => {
                expect({
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
