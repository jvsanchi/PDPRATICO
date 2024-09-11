// src/seed/seed.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "src/entities/roles.entity";
import { SeedService } from "./seeds.service";

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])], // Importando o RoleEntity
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
