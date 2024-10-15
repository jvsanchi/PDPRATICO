import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdministratorEntity } from "src/entities/administrator.entity";
import { Repository } from "typeorm";
import { AdministratorDto } from "./dto/administrator.dto";
import { BcryptUtil } from "src/utils/bcrypt.util";
import { CustomException } from "src/utils/customException";
import { RoleEnum } from "src/enum/roles.enum";
import { RoleEntity } from "src/entities/roles.entity";

@Injectable()
export class AdministratorService {
  constructor(
    @InjectRepository(AdministratorEntity)
    private readonly administratorEntity: Repository<AdministratorEntity>,

    @InjectRepository(RoleEntity)
    private readonly roleEntity: Repository<RoleEntity>,
  ) {}

  async getAllAdministrator(): Promise<AdministratorEntity[]> {
    return this.administratorEntity.find({ where: { activated: true } });
  }

  async createAdministrator(createAdmin: AdministratorDto): Promise<any> {
    const checkEmail = await this.administratorEntity.findOne({
      where: { email: createAdmin.email },
    });

    if (checkEmail) {
      throw new CustomException(
        "Email already registered",
        HttpStatus.CONFLICT,
      );
    }
    const hashedPassword = await BcryptUtil.hashPassword(createAdmin.password);

    // Atribui o papel de MASTER ao administrador por padrão
    const adminRole = await this.roleEntity.findOne({
      where: { role: RoleEnum.MASTER },
    });

    const createAdm = this.administratorEntity.create({
      name: createAdmin.name,
      email: createAdmin.email,
      password: hashedPassword,
      activated: true,
      //  role: adminRole,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return await this.administratorEntity.save(createAdm);
  }
}
