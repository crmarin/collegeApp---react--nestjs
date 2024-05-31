import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}