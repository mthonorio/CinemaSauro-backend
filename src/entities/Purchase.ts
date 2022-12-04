import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from './Client';
import { PurchaseSnack } from './PurchaseSnack';
import { PurchaseTicket } from './PurchaseTicket';

@Entity('purchase')
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Client, client => client.id)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @OneToMany(() => PurchaseSnack, purchaseSnack => purchaseSnack.id)
  purchase_snack: PurchaseSnack[];

  @OneToMany(() => PurchaseTicket, purchaseTicket => purchaseTicket.id)
  purchase_ticket: PurchaseTicket[];

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
