import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdministratorEntity } from "src/entities/administrator.entity";
import { RoleEntity } from "src/entities/roles.entity";
import { AdministratorService } from "./administrator.service";
import { AdministratorController } from "./administrator.controller";

@Module({
  imports: [TypeOrmModule.forFeature([AdministratorEntity, RoleEntity])],
  controllers: [AdministratorController],
  providers: [AdministratorService],
  exports: [AdministratorService],
})
export class AdministratorModule {}
