import { Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['name', 'type'])
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
