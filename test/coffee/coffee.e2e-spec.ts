import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesModule } from 'src/coffees/coffees.module';

// we can mock interactions database, use a disk-based database, or use a real database
describe('', async () => {
  let app: INestApplication;
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      CoffeesModule,
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'pass123',
        database: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
      }),
    ],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

it.todo('Create [POST /coffees]');
it.todo('Get all [GET /coffees]');
it.todo('Get one [GET /coffees/:id]');
it.todo('Update [PATCH /coffees/:id]');
it.todo('Delete [DELETE /coffees/:id]');

afterAll(async () => {
  await app.close();
});
