import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Ticket } from './Ticket';
import { Purchase } from './Purchase';
import { Section } from './Section';

@Entity('purchase_ticket')
export class PurchaseTicket {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Ticket, ticket => ticket.id)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @ManyToOne(() => Purchase, purchase => purchase.id)
  @JoinColumn({ name: 'purchase_id' })
  purchase: Purchase;

  @ManyToOne(() => Section, section => section.id)
  @JoinColumn({ name: 'section_id' })
  section: Section;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
