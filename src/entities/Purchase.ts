import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from './Client';
import { Ticket } from './Ticket';
import { Snack } from './Snack';

@Entity('purchase')
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, client => client.id)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column()
  snacks: string;

  @Column()
  tickets: string;

  @Column({ type: 'money' })
  value_total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
