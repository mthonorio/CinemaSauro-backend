import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PurchaseSnack } from './PurchaseSnack';

@Entity('snacks')
export class Snack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PurchaseSnack, purchaseSnack => purchaseSnack.id)
  purchase_snack: PurchaseSnack;

  @Column()
  name: string;

  @Column({ type: 'money' })
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
