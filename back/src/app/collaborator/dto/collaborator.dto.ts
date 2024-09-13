import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsEnum } from "class-validator";
import { Gender } from "src/enum/gender.enum";

export class CreateCollaboratorDto {
  @ApiProperty({
    description: "Full name of the collaborator",
    example: "John Doe",
  })
  @IsString()
  fullName: string;

  @ApiPropertyOptional({
    description: "Social name of the collaborator, if requested",
    example: "Johnny",
  })
  @IsOptional()
  @IsString()
  socialName?: string;

  @ApiProperty({
    description: "Gender of the collaborator",
    enum: Gender,
    example: Gender.MALE,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: "Nationality of the collaborator",
    example: "Brazilian",
  })
  @IsString()
  nationality: string;

  @ApiProperty({
    description: "Education level of the collaborator",
    example: "Bachelor’s Degree",
  })
  @IsString()
  educationLevel: string;

  @ApiProperty({
    description: "Residential address of the collaborator",
    example: "123 Main St, Springfield, IL",
  })
  @IsString()
  residentialAddress: string;

  @ApiProperty({
    description: "Position and role of the collaborator",
    example: "Software Engineer",
  })
  @IsString()
  position: string;

  @ApiProperty({
    description: "Work schedule of the collaborator",
    example: "9 AM - 5 PM",
  })
  @IsString()
  workSchedule: string;

  @ApiProperty({
    description: "Workplace location of the collaborator",
    example: "Office A, Building 1",
  })
  @IsString()
  workplaceLocation: string;
}
