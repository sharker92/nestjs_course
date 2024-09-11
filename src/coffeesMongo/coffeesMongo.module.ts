import { Module } from '@nestjs/common';
import { CoffeesMongoController } from './coffeesMongo.controller';
import { CoffeesMongoService } from './coffeesMongo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';
import { EventMongo, EventSchema } from 'src/events/entities/eventMongo.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Coffee.name,
        schema: CoffeeSchema,
      },
      { name: EventMongo.name, schema: EventSchema },
    ]),
  ],
  controllers: [CoffeesMongoController],
  providers: [CoffeesMongoService],
  exports: [CoffeesMongoService],
})
export class CoffeesMongoModule {}
