import { Injectable, Module, Scope } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { ConfigModule } from '@nestjs/config';

class ConfigService {}
class DeveloptmentConfigService {}
class ProductionConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    /* ... do something */
    return ['buddy brew', 'nescafe'];
  }
}
@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), ConfigModule],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DeveloptmentConfigService
          : ProductionConfigService,
    },
    {
      provide: COFFEE_BRANDS,
      useFactory: async (
        brandsFactory: CoffeeBrandsFactory,
      ): Promise<string[]> => {
        // const coffeeBrandsFactory = await connection.query('SELECT * ...');
        const coffeeBrands = await Promise.resolve(brandsFactory.create());
        console.log('[!] Async factory');
        return coffeeBrands;
      },
      inject: [CoffeeBrandsFactory],
      scope: Scope.TRANSIENT,
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
