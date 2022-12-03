import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Actor } from './Actor';
import { Movie } from './Movie';

@Entity('cast')
export class Cast {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Movie, movie => movie.id)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => Actor, actor => actor.id)
  @JoinColumn({ name: 'actor_id' })
  actor: Actor;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
