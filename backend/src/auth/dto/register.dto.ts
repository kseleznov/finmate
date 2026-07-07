import { IsEmail, Matches, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @Matches(/^[a-zA-Z0-9_.-]+$/)
  @MinLength(3)
  username: string;

  @MinLength(8)
  password: string;
}
