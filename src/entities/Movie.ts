import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Actor } from './Actor';
import { Session } from './Session';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Foreign Key
  @ManyToMany(() => Actor, actor => actor.movies)
  actors: Actor[];

  @OneToMany(() => Session, session => session.room)
  sessions: Session[];

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  censorship: string;

  @Column()
  category: string;

  @Column()
  duration: number;

  @Column()
  production_company: string;

  @Column()
  imageUrl: string;

  @Column()
  isPremiere: boolean;

  @Column()
  isNational: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
