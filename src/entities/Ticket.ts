import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Purchase } from './Purchase';
import { Session } from './Session';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Purchase, purchase => purchase.tickets)
  @JoinTable({
    name: 'purchase_ticket',
    joinColumn: {
      name: 'purchase_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'ticket_id',
      referencedColumnName: 'id',
    },
  })
  purchases: Purchase[];

  @ManyToOne(() => Session, session => session.ticket)
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @Column()
  session_id: string;

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
