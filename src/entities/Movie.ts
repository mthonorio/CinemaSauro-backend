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

  @Column()
  censorship: string;

  @Column()
  category: string;

  @Column()
  duration: number;

  @Column()
  production_company: string;

  @Column({
    nullable: false,
    default:
      'https://img.freepik.com/free-photo/gray-abstract-wireframe-technology-background_53876-101941.jpg?w=2000',
  })
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
