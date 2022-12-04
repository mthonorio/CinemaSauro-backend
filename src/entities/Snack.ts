import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PurchaseSnack } from './PurchaseSnack';

@Entity('snacks')
export class Snack {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToMany(() => PurchaseSnack, purchaseSnack => purchaseSnack.id)
  purchase_snack: PurchaseSnack[];

  @Column()
  name: string;

  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
