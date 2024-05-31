import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'Field name must be added' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Field last name must be added' })
  @IsString()
  lastName: string;

  @IsNotEmpty({ message: 'Field email must be added' })
  @IsString()
  email: string;
}
