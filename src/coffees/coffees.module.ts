import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../events/entities/event.entity';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { Connection } from 'typeorm';
// Our mock implementation
export class MockCoffeesService {}

// need to illustrate custom providers with class providers
class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

// need to more realistic illustration factory providers
@Injectable()
export class CoffeeBrandsFactory {
  create() {
    /* do something */
    return ['buddy brew', 'nescafe', 'brazilian gust'];
  }
}
@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  // nest providers
  // providers: [CoffeesService],
  // --------------------------------------------------------------------
  // 1/ illustrate custom providers with mock CoffeService providers pattern
  // providers: [
  //   {
  //     provide: CoffeesService,
  //     useValue: new MockCoffeesService(), // <-- mock implementation
  //   },
  // ],
  // -----------------------------------------------------------------
  // illustrate custom providers with private tokken providers pattern
  // providers: [
  //   CoffeesService,
  //   {
  //     provide: COFFEE_BRANDS, // 👈
  //     useValue: ['buddy brew', 'nescafe'], // array of coffee brands,
  //   },
  // ],
  // --------------------------------------------------------
  // 2/ illustrate custom providers with class providers pattern
  // providers: [
  //   CoffeesService,
  //   {
  //     provide: ConfigService,
  //     useClass:
  //       process.env.NODE_ENV === 'development'
  //         ? DevelopmentConfigService
  //         : ProductionConfigService,
  //   },
  //   {
  //     provide: COFFEE_BRANDS, // 👈
  //     useValue: ['buddy brew', 'nescafe'], // array of coffee brands,
  //   },
  // ],
  // ------------------------------------
  // 3/ illustrate Factory providers pattern
  // providers: [
  //   CoffeesService,
  //   CoffeeBrandsFactory,
  //   {
  //     provide: COFFEE_BRANDS, // 👈
  //     useFactory: (brandsFactory: CoffeeBrandsFactory) =>
  //       brandsFactory.create(),
  //     inject: [CoffeeBrandsFactory],
  //   },
  // ],
  // 4/illustrate async providers (not want to start accepting request until database connection is established)
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      // Note "async" here, and Promise/Async event inside the Factory function
      // Could be a database connection / API call / etc
      // In our case we're just "mocking" this type of event with a Promise
      useFactory: async (connection: Connection): Promise<string[]> => {
        // const coffeeBrands = await connection.query('SELECT * ...');
        const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
        console.log('[!] Async factory');
        return coffeeBrands;
      },
      inject: [Connection],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
