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
import { PurchaseTicket } from './PurchaseTicket';
import { Session } from './Session';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => PurchaseTicket, purchaseTicket => purchaseTicket.id)
  purchase_ticket: PurchaseTicket[];

  @ManyToOne(() => Session, session => session.id)
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @Column()
  seat: number;

  @Column({ type: 'money' })
  value: number;

  @Column()
  date_session: Date;

  @Column()
  category: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
