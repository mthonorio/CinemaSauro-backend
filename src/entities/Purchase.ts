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
  id: string;

  @ManyToOne(() => Client, client => client.id)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @OneToMany(() => PurchaseSnack, purchaseSnack => purchaseSnack.id)
  @JoinColumn({ name: 'purchase_snack_id' })
  purchase_snack: PurchaseSnack[];

  @OneToMany(() => PurchaseTicket, purchaseTicket => purchaseTicket.id)
  @JoinColumn({ name: 'purchase_ticket_id' })
  purchase_ticket: PurchaseTicket[];

  @Column({ type: 'money' })
  value_ticket: number;
  @Column()
  value_discount_ticket: number;
  @Column({ type: 'money' })
  value_total_ticket: number;

  @Column({ type: 'money', nullable: true })
  value_snack: number;
  @Column({ type: 'money', nullable: true })
  value_total_snack: number;
  @Column({ type: 'money' })
  value_total_purchase: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
