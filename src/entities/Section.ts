import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Movie } from './Movie';
import { Room } from './Room';
import { Ticket } from './Ticket';
import { TypeSection } from './TypeSection';

@Entity('section')
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Movie, movie => movie.id)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => TypeSection, type_section => type_section.id)
  @JoinColumn({ name: 'type_section_id' })
  type_section: TypeSection;

  @ManyToOne(() => Room, room => room.id)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @OneToOne(() => Ticket, ticket => ticket.id)
  ticket: Ticket;

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
