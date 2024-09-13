import { Injectable, NotFoundException } from "@nestjs/common";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CollaboratorEntity } from "src/entities/collaborator.entity";
import { CreateCollaboratorDto } from "./dto/collaborator.dto";
import { UserEntity } from "src/entities/user.entity";

@Injectable()
export class CollaboratorService {
  constructor(
    @InjectRepository(CollaboratorEntity)
    private readonly collaboratorRepository: Repository<CollaboratorEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(
    createCollaboratorDto: CreateCollaboratorDto,
  ): Promise<CollaboratorEntity> {
    const collaborator = this.collaboratorRepository.create(
      createCollaboratorDto,
    );
    return this.collaboratorRepository.save(collaborator);
  }

  async findOne(id: number): Promise<CollaboratorEntity> {
    const collaborator = await this.collaboratorRepository.findOne({
      where: { id: id },
    });
    if (!collaborator) {
      throw new NotFoundException(`Collaborator with ID ${id} not found`);
    }
    return collaborator;
  }

  async update(
    id: number,
    updateCollaboratorDto: CreateCollaboratorDto,
  ): Promise<CollaboratorEntity> {
    const collaborator = await this.collaboratorRepository.findOne({
      where: { id: id },
    });
    Object.assign(collaborator, updateCollaboratorDto);
    return this.collaboratorRepository.save(collaborator);
  }

  async remove(id: number): Promise<void> {
    const result = await this.collaboratorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Collaborator with ID ${id} not found`);
    }
  }
}
