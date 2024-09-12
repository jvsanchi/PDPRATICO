import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

import { UserModule } from "../user/user.module";
import { ProductEntity } from "src/entities/product.entity";

import { UserEntity } from "src/entities/user.entity";
import { JwtConfigModule } from "src/auth/JwtConfig.module";
import { AuthModule } from "src/auth/auth.module";
import { RolesGuard } from "src/roles/roles.guard";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, UserEntity]),
    UserModule,
    AuthModule,
    JwtConfigModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, RolesGuard],
  exports: [ProductService],
})
export class ProductModule {}
