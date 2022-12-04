import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Purchase } from './Purchase';
import { Snack } from './Snack';

@Entity('purchase_snack')
export class PurchaseSnack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Snack, snack => snack.id)
  @JoinColumn({ name: 'snack_id' })
  snack: Snack;

  @ManyToOne(() => Purchase, purchase => purchase.id)
  @JoinColumn({ name: 'purchase_id' })
  purchase: Purchase;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
