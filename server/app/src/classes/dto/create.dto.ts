import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty({ message: 'Field name must be added' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Field description must be added' })
  @IsString()
  description: string;
}
