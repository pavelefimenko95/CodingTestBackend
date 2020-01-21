import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ActionsModule } from '../src/actions/actions.module';
import { INestApplication } from '@nestjs/common';

export default () => {
    let app: INestApplication;
    const actionsService = {
        handleDeprecations: () => ({}),
    };

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [ActionsModule],
        })
            .overrideProvider(actionsService)
            .useValue(actionsService)
            .compile();

        app = module.createNestApplication();
        await app.init();
    });

    it(`/GET actions/handle-deprecations`, done => {
        return request(app.getHttpServer())
            .get('/actions/handle-deprecations')
            .expect(200)
            .expect(actionsService.handleDeprecations())
            .end(done);
    });

    afterAll(async () => {
        await app.close();
    });
};
