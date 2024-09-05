import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'data-source';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffeesMongoModule } from './coffeesMongo/coffeesMongo.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOptions,
        autoLoadEntities: true,
      }),
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5434),
      }),
      load: [appConfig],
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-course'),
    CoffeesModule,
    CoffeesMongoModule,
    CoffeeRatingModule,
    DatabaseModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
