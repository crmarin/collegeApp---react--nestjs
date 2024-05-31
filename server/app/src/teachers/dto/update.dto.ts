import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherDto } from './create.dto';

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {}
