import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './model/Class';
import { Teacher } from 'src/teachers/model/Teacher';
import { Student } from 'src/students/model/Student';
import { StudentsService } from 'src/students/students.service';
import { TeachersService } from 'src/teachers/teachers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Teacher, Student])],
  providers: [ClassesService, StudentsService, TeachersService],
  controllers: [ClassesController],
})
export class ClassesModule {}
