import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}
