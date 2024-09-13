import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerEntity } from "../entities/customer.entity";
import { AccountsPayable } from "src/entities/accountsPayable.entity";
import { UserEntity } from "src/entities/user.entity";
import { RoleEntity } from "src/entities/roles.entity";
import { ProductEntity } from "src/entities/product.entity";
import { CollaboratorEntity } from "src/entities/collaborator.entity";
import { AdministratorEntity } from "src/entities/administrator.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.HOST,
      port: Number(process.env.PORT) || 5432,
      username: "root",
      password: "123456",
      database: "pdepratico",
      entities: [
        CustomerEntity,
        AccountsPayable,
        UserEntity,
        RoleEntity,
        ProductEntity,
        CollaboratorEntity,
        AdministratorEntity,
      ],
      synchronize: false,
    }),
  ],
})
export class ConnectionModule {}
