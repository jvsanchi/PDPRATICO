import { AccountsPayable } from "src/entities/accountsPayable.entity";
import { AdministratorEntity } from "src/entities/administrator.entity";
import { CollaboratorEntity } from "src/entities/collaborator.entity";
import { CustomerEntity } from "src/entities/customer.entity";
import { ProductEntity } from "src/entities/product.entity";
import { RoleEntity } from "src/entities/roles.entity";
import { UserEntity } from "src/entities/user.entity";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
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
  migrations: ["src/migrations/*.ts"],
  synchronize: false,
});
