import { Module } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "src/entities/roles.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [],
  exports: [],
})
export class RoleModules {}
