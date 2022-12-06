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
import { Movie } from './Movie';
import { Room } from './Room';
import { Ticket } from './Ticket';
import { TypeSession } from './TypeSession';

@Entity('session')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Movie, movie => movie.id)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => TypeSession, type_session => type_session.id)
  @JoinColumn({ name: 'type_session_id' })
  type_session: TypeSession;

  @ManyToOne(() => Room, room => room.sessions)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @OneToMany(() => Ticket, ticket => ticket.session)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket[];

  @Column()
  timetable: string;

  @Column('timestamp with time zone')
  date_start: Date;

  @Column('timestamp with time zone')
  date_end: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
