import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Purchase } from './Purchase';

@Entity('snacks')
export class Snack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Purchase, purchase => purchase.snacks)
  @JoinTable({
    name: 'purchase_snack',
    joinColumn: {
      name: 'purchase_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'snack_id',
      referencedColumnName: 'id',
    },
  })
  purchases: Purchase[];

  @Column()
  name: string;

  @Column({ type: 'money' })
  value: number;

  @Column({ default: 0 })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
