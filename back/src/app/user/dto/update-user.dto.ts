import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "src/enum/roles.enum";

export class UpdateUserDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: number;
}
