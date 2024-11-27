import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { BcryptUtil } from "src/utils/bcrypt.util";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { CustomException } from "src/utils/customException";
import { RoleEntity } from "src/entities/roles.entity";
import { RoleEnum } from "src/enum/roles.enum";
import { UpdateUserRolesDTO } from "./dto/update-user-role.dto";
import { AdministratorEntity } from "src/entities/administrator.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,

    @InjectRepository(RoleEntity)
    private readonly roleEntity: Repository<RoleEntity>,

    @InjectRepository(AdministratorEntity)
    private readonly adminRepository: Repository<AdministratorEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    const findUsers = await this.userEntity.find({
      where: { activated: true },
      relations: ["role"],
    });

    console.log(findUsers);
    return findUsers;
  }

  async findByEmail(email: string): Promise<any> {
    const findEmail = await this.userEntity.findOne({
      where: { email },
      relations: ["role"],
    });
    return findEmail;
  }

  async findById(id: number): Promise<UserEntity | undefined> {
    return this.userEntity.findOne({
      where: { id },
      relations: ["role"],
    });
  }

  async createUser(createUser: CreateUserDTO): Promise<any> {
    const hashedPassword = await BcryptUtil.hashPassword(createUser.password);

    // Busca o papel especificado na requisição
    const userRole = await this.roleEntity.findOne({
      where: { role: createUser.role },
    });

    if (!userRole) {
      throw new CustomException("Role Not Found!", HttpStatus.NOT_FOUND);
    }

    const create = this.userEntity.create({
      name: createUser.name,
      email: createUser.email,
      created_at: new Date(),
      updated_at: new Date(),
      password: hashedPassword,
      role: userRole, // Associa a role ao usuário
    });

    return await this.userEntity.save(create);
  }

  async updateUser(updateUserDTO: UpdateUserDTO): Promise<any> {
    const update = await this.userEntity.findOne({
      where: { email: updateUserDTO.email },
      relations: ["role"],
    });

    if (!update) {
      throw new CustomException("User Not Found!", HttpStatus.NOT_FOUND);
    }

    update.email = updateUserDTO.email;
    update.name = updateUserDTO.name;

    return await this.userEntity.save(update);
  }

  async disableUser(email: string): Promise<any> {
    const disable = await this.userEntity.findOne({
      where: { email },
      relations: ["role"],
    });

    if (!disable) {
      throw new CustomException("User Not Found!", HttpStatus.NOT_FOUND);
    }

    disable.activated = false;
    disable.updated_at = new Date();

    return await this.userEntity.save(disable);
  }

  // Novo método para atualizar a role de um usuário
  async updateUserRole(updateUserRoles: UpdateUserRolesDTO): Promise<any> {
    const user = await this.userEntity.findOne({
      where: { id: updateUserRoles.id },
      relations: ["role"],
    });

    if (!user) {
      throw new CustomException("User Not Found!", HttpStatus.NOT_FOUND);
    }

    const newRole = await this.roleEntity.findOne({
      where: { role: updateUserRoles.role },
    });
    if (!newRole) {
      throw new CustomException("Role Not Found!", HttpStatus.NOT_FOUND);
    }

    user.role = newRole;
    return await this.userEntity.save(user);
  }
}
