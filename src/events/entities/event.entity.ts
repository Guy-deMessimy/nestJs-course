import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

/* Event */
// help speed to retrieve data with @Index
@Index(['name', 'type'])
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Index()
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
