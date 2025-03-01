import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";
export class CreateCustomerDTO {
  @ApiProperty({ name: "name", example: "name" })
  name: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  observations: string;

  @ApiProperty()
  dateOfBirth: string;

  @ApiProperty()
  rg: string;

  @ApiProperty()
  ie: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  telephone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  activated: boolean;
}

export class UpdateCustomerDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  observations: string;

  @ApiProperty()
  dateOfBirth: string;

  @ApiProperty()
  rg: string;

  @ApiProperty()
  ie: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  telephone: string;

  @ApiProperty()
  email: string;
}
