import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { AdministratorEntity } from "src/entities/administrator.entity";

export class CreateUserDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  role: string; // Campo para a role

  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  administratorId: number;
}
