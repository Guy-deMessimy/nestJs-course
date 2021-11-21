import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { CoffeeRatingService } from 'src/coffee-rating/coffee-rating.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    // Utilizing the dynamic DatabaseModule in another Modules imports: []
    DatabaseModule.register({
      // 👈 passing in dynamic values
      type: 'postgres',
      host: 'localhost',
      password: 'password',
    }),
    CoffeesModule,
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
