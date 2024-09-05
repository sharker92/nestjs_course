import { Module } from '@nestjs/common';
import { CoffeesMongoController } from './coffeesMongo.controller';
import { CoffeesMongoService } from './coffeesMongo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Coffee.name,
        schema: CoffeeSchema,
      },
    ]),
  ],
  controllers: [CoffeesMongoController],
  providers: [CoffeesMongoService],
  exports: [CoffeesMongoService],
})
export class CoffeesMongoModule {}
