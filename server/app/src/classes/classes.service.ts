import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Class } from './model/Class';
import { Student } from 'src/students/model/Student';
import { Teacher } from 'src/teachers/model/Teacher';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async findAll(): Promise<Class[]> {
    return await this.classRepository.find({
      relations: ['teacher', 'students'],
    });
  }

  async findOne(id: number): Promise<Class> {
    const teacher = await this.classRepository.findOne({
      where: { id: id },
      relations: ['teacher', 'students'],
    });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
    return teacher;
  }

  async create(data): Promise<Class> {
    const teacher = await this.teacherRepository.findOne({
      where: { id: data.teacherId },
    });
    const students = await this.studentRepository.findBy({
      id: In(data.studentIds),
    });
    const _class = new Class();
    _class.name = data.name;
    _class.description = data.description;
    _class.teacher = teacher;
    _class.students = students;
    // const class = this.classRepository.create(data);
    return await this.classRepository.save(_class);
  }

  async update(id: number, data): Promise<Class> {
    const _class = await this.classRepository.findOne({
      where: { id: id },
      relations: ['teacher', 'students'],
    });
    const teacher = await this.teacherRepository.findOne({
      where: { id: data.teacherId },
    });
    const students = await this.studentRepository.findBy({
      id: In(data.studentIds),
    });
    _class.name = data.name;
    _class.description = data.description;
    _class.teacher = teacher;
    _class.students = students;
    return await this.classRepository.save(_class);
  }

  async remove(id: number) {
    const result = await this.classRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`A Class "${id}" was not found`);
    }
    return { message: 'Class successfully deleted' };
  }
}
