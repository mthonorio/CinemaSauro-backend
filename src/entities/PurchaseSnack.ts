import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('purchase')
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: number;

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
