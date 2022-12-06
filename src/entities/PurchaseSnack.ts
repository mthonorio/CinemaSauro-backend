import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Purchase } from './Purchase';
import { Snack } from './Snack';

@Entity('purchase_snack')
export class PurchaseSnack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Snack, snack => snack.id)
  @JoinColumn({ name: 'snack_id' })
  snack: Snack[];

  @ManyToOne(() => Purchase, purchase => purchase.id)
  purchase: Purchase;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
