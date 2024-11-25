import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoleEntity } from "src/entities/roles.entity";
import { UserEntity } from "src/entities/user.entity";
import { RoleEnum } from "src/enum/roles.enum";
import * as bcrypt from "bcrypt";

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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

  async seedAdministrator() {
    const adminExists = await this.userRepository.findOne({
      where: { email: "admin@example.com" },
    });

    if (!adminExists) {
      // Busca o papel de administrador
      const adminRole = await this.roleRepository.findOne({
        where: { role: RoleEnum.ADMIN },
      });

      if (!adminRole) {
        throw new Error("Role ADMIN not found. Please seed roles first.");
      }

      const hashedPassword = await bcrypt.hash("Admin123!", 10); // Criptografa a senha

      const admin = this.userRepository.create({
        name: "Administrator",
        email: "admin@example.com",
        password: hashedPassword,
        role: adminRole,
        activated: true,
        created_at: new Date(),
        updated_at: new Date(),
      });

      await this.userRepository.save(admin);
    }
  }
}
