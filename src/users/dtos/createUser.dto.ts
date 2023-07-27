import { IsEmail, Length } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;
  @Length(3, 10)
  password: string;
}

export class UpdateUserDto {
  @Length(3, 10)
  password: string;
}
