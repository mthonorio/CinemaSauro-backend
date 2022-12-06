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
import { Ticket } from './Ticket';
import { Purchase } from './Purchase';
import { Session } from './Session';

@Entity('purchase_ticket')
export class PurchaseTicket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Ticket, ticket => ticket.id)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket[];

  @ManyToOne(() => Purchase, purchase => purchase.id)
  purchase: Purchase;

  @OneToMany(() => Session, session => session.id)
  @JoinColumn({ name: 'session_id' })
  session: Session[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
