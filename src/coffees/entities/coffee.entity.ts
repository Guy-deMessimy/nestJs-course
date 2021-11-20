import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity() //sql table === 'coffees' otherwise we can precise an entity string parameter
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  // use the 2 parameter to store array's as json and make column optionnal
  // @Column('json', { nullable: true })
  // flavors: string[];

  @JoinTable() // 👈 Join the 2 tables - only the OWNER-side does this
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, {
    cascade: true, // 👈 or optionally just insert or update ['insert']
  })
  flavors: Flavor[];
}
