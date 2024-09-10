import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { BcryptUtil } from "src/utils/bcrypt.util";
import { UpdateUserDTO } from "./dto/update-user.dto copy";
import { CustomException } from "src/utils/customException";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userEntity.find({ where: { activated: true } });
  }

  async findByEmail(email: string): Promise<any> {
    const findEmail = await this.userEntity.findOne({ where: { email } });

    return findEmail;
  }

  async createUser(createUser: CreateUserDTO): Promise<any> {
    const hashedPassword = await BcryptUtil.hashPassword(createUser.password);

    const create = this.userEntity.create({
      name: createUser.name,
      email: createUser.email,
      created_at: new Date(),
      updated_at: new Date(),
      password: hashedPassword,
    });
    return await this.userEntity.save(create);
  }

  async updateUser(updateUserDTO: UpdateUserDTO): Promise<any> {
    const update = await this.userEntity.findOne({
      where: { email: updateUserDTO.email },
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
      where: { email: email },
    });

    if (!disable) {
      throw new CustomException("User Not Found!", HttpStatus.NOT_FOUND);
    }

    disable.activated = false;
    disable.updated_at = new Date();

    return await this.userEntity.save(disable);
  }
}
