import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Class } from '../../classes/model/Class';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @ManyToMany(() => Class, (classes) => classes.students)
  classes: Class[];
}
