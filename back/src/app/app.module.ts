import { Module } from "@nestjs/common";
import { CustomerModule } from "./customer/customer.module";
import { AccountsPayableModule } from "./accounts_payable/accountsPayable.module";
import { UserModule } from "./user/user.module";
import { ProductModule } from "./product/product.module";
import { AuthModule } from "src/auth/auth.module";
import { CollaboratorModule } from "./collaborator/collaborator.module";
import { AdministratorModule } from "./administrator/administrador.module";
import { RoleModules } from "./role/role.module";

@Module({
  imports: [
    AuthModule,
    CustomerModule,
    AccountsPayableModule,
    UserModule,
    ProductModule,
    CollaboratorModule,
    AdministratorModule,
    RoleModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModules {}
