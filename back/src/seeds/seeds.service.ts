import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoleEntity } from "src/entities/roles.entity";
import { RoleEnum } from "src/enum/roles.enum";

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async seedRoles() {
    const roles = Object.values(RoleEnum);

    // Verifica e atualiza ou insere os papéis
    for (const role of roles) {
      const roleExists = await this.roleRepository.findOne({ where: { role } });

      if (!roleExists) {
        const newRole = this.roleRepository.create({ role });
        await this.roleRepository.save(newRole);
      }
    }
  }
}
