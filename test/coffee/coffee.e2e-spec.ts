import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { CreateCoffeeDto } from '../../src/coffees/dto/create-coffee.dto';

// we can mock interactions database, use a disk-based database, or use a real database
describe('[Feature] Coffees - /coffees', () => {
  const coffee = {
    name: 'Shipwreck Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla'],
  };
  let app: INestApplication;
  beforeAll(async () => {
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
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });
  it('Create [POST /coffees]', () => {
    return request(app.getHttpServer())
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED) // until here could be enough
      .then(({ body }) => {
        const expectedCoffee = expect.objectContaining({
          ...coffee,
          flavors: expect.arrayContaining(
            coffee.flavors.map((name) => expect.objectContaining({ name })), // TODO revisar las salida del body para entender esta logica
          ),
        }); // optionally could create files with expected responses and DTO to avoid this repeating logic
        expect(body).toEqual(expectedCoffee);
      });
  });

  it('Create [POST /coffees]2', async () => {
    const response = await request(app.getHttpServer())
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED);

    const expectedCoffee = expect.objectContaining({
      ...coffee,
      flavors: expect.arrayContaining(
        coffee.flavors.map((name) => expect.objectContaining({ name })),
      ),
    });

    expect(response.body).toEqual(expectedCoffee);
  });
  it.todo('Get all [GET /coffees]');
  it.todo('Get one [GET /coffees/:id]');
  it.todo('Update [PATCH /coffees/:id]');
  it.todo('Delete [DELETE /coffees/:id]');

  afterAll(async () => {
    await app.close();
  });
});
//todo this file is working?
