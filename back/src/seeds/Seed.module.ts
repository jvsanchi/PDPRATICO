import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "src/entities/roles.entity";
import { UserEntity } from "src/entities/user.entity";
import { SeedService } from "./seeds.service";

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, UserEntity])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
