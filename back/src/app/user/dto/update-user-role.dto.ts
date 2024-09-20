import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "src/enum/roles.enum";

export class UpdateUserRolesDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  role: RoleEnum;
}
