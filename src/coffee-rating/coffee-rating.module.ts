import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { CoffeeRatingService } from 'src/coffee-rating/coffee-rating.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule.register({
      // 👈 passing in dynamic values
      type: 'postgres',
      host: 'localhost',
      password: 'password',
      port: 5432,
    }),
    CoffeesModule,
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
