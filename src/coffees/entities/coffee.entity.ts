import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() //sql table === 'coffees' otherwise we can precise an entity string parameter
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  // use the 2 parameter to store array's as json and make column optionnal
  @Column('json', { nullable: true })
  flavors: string[];
}
