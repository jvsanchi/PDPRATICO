import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class DisableCustomerDTO {
  @ApiProperty({ example: "teste@gmaiil.com" })
  @IsEmail()
  email: string;
}
