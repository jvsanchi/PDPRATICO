import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from "class-validator";
import { CreateUserDTO } from "src/app/user/dto/create-user.dto";

export class AdministratorDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  @Length(1, 255)
  nome: string;

  @IsEmail()
  @Length(1, 255)
  email: string;

  @IsString()
  @Length(6, 255)
  password: string;

  @IsBoolean()
  activated: boolean;

  created_at: Date;

  updated_at: Date;

  users?: CreateUserDTO[];
}
