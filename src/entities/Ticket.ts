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
  id: number;

  @OneToMany(() => PurchaseTicket, purchaseTicket => purchaseTicket.id)
  purchase_ticket: PurchaseTicket[];

  @OneToOne(() => Section, section => section.id)
  @JoinColumn({ name: 'section_id' })
  section: Section;

  @Column()
  clientId: number;

  @Column()
  buyId: number;

  @Column()
  movieId: number;

  @Column()
  sectionId: number;

  @Column()
  seatId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
