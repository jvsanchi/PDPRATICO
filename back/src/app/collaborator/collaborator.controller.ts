import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiResponse, ApiParam } from "@nestjs/swagger";

import { CollaboratorEntity } from "src/entities/collaborator.entity";
import { CollaboratorService } from "./collaborator.service";
import { CreateCollaboratorDto } from "./dto/collaborator.dto";

@ApiTags("collaborators")
@Controller("collaborators")
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The collaborator has been successfully created.",
    type: CollaboratorEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data.",
  })
  async create(
    @Body() createCollaboratorDto: CreateCollaboratorDto,
  ): Promise<CollaboratorEntity> {
    return this.collaboratorService.create(createCollaboratorDto);
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "The unique identifier of the collaborator",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The collaborator has been successfully retrieved.",
    type: CollaboratorEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Collaborator not found.",
  })
  async findOne(@Param("id") id: number): Promise<CollaboratorEntity> {
    return this.collaboratorService.findOne(id);
  }

  @Put(":id")
  @ApiParam({
    name: "id",
    description: "The unique identifier of the collaborator",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The collaborator has been successfully updated.",
    type: CollaboratorEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Collaborator not found.",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data.",
  })
  async update(
    @Param("id") id: number,
    @Body() updateCollaboratorDto: CreateCollaboratorDto,
  ): Promise<CollaboratorEntity> {
    return this.collaboratorService.update(id, updateCollaboratorDto);
  }

  @Delete(":id")
  @ApiParam({
    name: "id",
    description: "The unique identifier of the collaborator",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The collaborator has been successfully deleted.",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Collaborator not found.",
  })
  async remove(@Param("id") id: number): Promise<void> {
    return this.collaboratorService.remove(id);
  }
}
