import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserEntity } from "src/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "src/entities/roles.entity";
import { JwtConfigModule } from "src/auth/JwtConfig.module";
import { AdministratorEntity } from "src/entities/administrator.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, AdministratorEntity]),
    JwtConfigModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
