import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './model/Student';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly teacherRepository: Repository<Student>,
  ) {}

  async findAll(): Promise<Student[]> {
    return await this.teacherRepository.find();
  }

  async findOne(id: number): Promise<Student> {
    const teacher = await this.teacherRepository.findOne({ where: { id: id } });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
    return teacher;
  }

  async create(data): Promise<Student> {
    // const student = this.teacherRepository.create(data);
    return await this.teacherRepository.save(data);
  }

  async update(id: number, data): Promise<Student> {
    const teacher = await this.findOne(id);
    Object.assign(teacher, data);
    return await this.teacherRepository.save(teacher);
  }

  async remove(id: number) {
    const result = await this.teacherRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`A student "${id}" was not found`);
    }
    return { message: 'Student successfully deleted' };
  }
}
