import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { AdministratorEntity } from "src/entities/administrator.entity";

export class CreateUserDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  administratorId: number;
}
