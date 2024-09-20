import { ApiProperty } from "@nestjs/swagger";

export class DisableUserDTO {
  @ApiProperty()
  email: string;
}
