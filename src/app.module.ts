import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { ArstController } from './arst/arst.controller';

@Module({
  imports: [],
  controllers: [AppController, CoffeesController, ArstController],
  providers: [AppService],
})
export class AppModule {}
