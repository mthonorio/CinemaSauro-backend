import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Movie } from './Movie';

@Entity('actors')
export class Actor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Movie, movie => movie.actors)
  @JoinTable({
    name: 'cast',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'actor_id',
      referencedColumnName: 'id',
    },
  })
  movies: Movie[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
