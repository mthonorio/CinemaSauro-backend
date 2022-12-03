import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from './Client';

@Entity('purchase')
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Client, client => client.id)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column()
  id_client: number;

  @Column()
  value_ticket: number;
  @Column()
  value_discount_ticket: number;
  @Column()
  value_total_ticket: number;

  @Column()
  value_snack: number;
  @Column()
  value_total_snack: number;
  @Column()
  value_total_purchase: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
