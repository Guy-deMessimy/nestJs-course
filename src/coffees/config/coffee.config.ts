/* /src/coffees/coffees.config.ts File */
import { registerAs } from '@nestjs/config';

export default registerAs('coffees', () => ({
  // 👈
  foo: 'bar', // 👈
}));
