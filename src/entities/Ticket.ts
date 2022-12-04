import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PurchaseTicket } from './PurchaseTicket';
import { Section } from './Section';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => PurchaseTicket, purchaseTicket => purchaseTicket.id)
  purchase_ticket: PurchaseTicket[];

  @OneToOne(() => Section, section => section.id)
  @JoinColumn({ name: 'section_id' })
  section: Section;

  @Column()
  seat: number;

  @Column({ type: 'money' })
  value: number;

  @Column()
  date_section: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
