import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class EnableCustomerDTO {
  @ApiProperty({ example: "teste@gmaiil.com" })
  @IsEmail()
  email: string;
}
