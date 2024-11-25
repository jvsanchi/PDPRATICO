import { Controller, Get } from "@nestjs/common";
import { RoleEntity } from "src/entities/roles.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Controller("roles")
export class RoleController {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  @Get()
  async getRoles(): Promise<RoleEntity[]> {
    return this.roleRepository.find();
  }
}
