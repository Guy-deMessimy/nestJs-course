import { DynamicModule, Module } from '@nestjs/common';
import { createConnection, ConnectionOptions } from 'typeorm';

// @Module({
// database module statically configure and can't be customized
// what if another app wants to use database module but needs to use a different port ?
//   providers: [
//     {
//       provide: 'CONNECTION',
//       useValue: createConnection({
//         type: 'postgres',
//         host: 'localhost',
//         port: 5432,
//       }),
//     },
//   ],
// })
// illustrate to create a dynamic module that can be passed config settings before it instantiates
// Improved Dynamic Module way of creating CONNECTION provider
export class DatabaseModule {
  /* ConnectionOptions helps strongly Type everything we are allowing other modules to pass in */
  /* DynamicModule it will be returns by register methods with require module property be passed */
  /* we now be are able to pass down ALL options we received when this register() method was invoked */
  static register(options: ConnectionOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION', // 👈
          useValue: createConnection(options),
        },
      ],
    };
  }
}
