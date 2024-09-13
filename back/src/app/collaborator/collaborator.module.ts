import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CollaboratorService } from "./collaborator.service";
import { CollaboratorController } from "./collaborator.controller";
import { CollaboratorEntity } from "src/entities/collaborator.entity";
import { UserEntity } from "src/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CollaboratorEntity, UserEntity])],
  controllers: [CollaboratorController],
  providers: [CollaboratorService],
  exports: [CollaboratorService],
})
export class CollaboratorModule {}
