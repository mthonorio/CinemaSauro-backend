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
import { Section } from './Section';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Foreign Key
  @ManyToMany(() => Actor, actor => actor.movies)
  actors: Actor[];

  @OneToMany(() => Section, section => section.room)
  sections: Section[];

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

  @Column()
  isPremiere: boolean;

  @Column()
  isNational: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
