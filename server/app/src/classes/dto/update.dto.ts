import { PartialType } from '@nestjs/mapped-types';
import { CreateClassDto } from './create.dto';

export class UpdateClassDto extends PartialType(CreateClassDto) {}
