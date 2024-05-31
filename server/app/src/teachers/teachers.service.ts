import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './model/Teacher';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async findAll(): Promise<Teacher[]> {
    return await this.teacherRepository.find();
  }

  async findOne(id: number): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({ where: { id: id } });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
    return teacher;
  }

  async create(data): Promise<Teacher> {
    console.log('🚀 ~ TeachersService ~ create ~ data:', data);
    // const teacher = this.teacherRepository.create(data);
    return await this.teacherRepository.save(data);
  }

  async update(id: number, data): Promise<Teacher> {
    console.log("🚀 ~ TeachersService ~ update ~ data:", data)
    const teacher = await this.findOne(id);
    Object.assign(teacher, data);
    return await this.teacherRepository.save(teacher);
  }

  async remove(id: number) {
    const result = await this.teacherRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`A teacher "${id}" was not found`);
    }
    return { message: 'Teacher successfully deleted' };
  }
}
