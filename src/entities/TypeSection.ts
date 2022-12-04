import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Section } from './Section';

@Entity('type_section')
export class TypeSection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Section, section => section.room)
  sections: Section[];

  @Column()
  name: string;

  @Column()
  discount_percentage: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
