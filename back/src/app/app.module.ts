import { Module } from "@nestjs/common";
import { CustomerModule } from "./customer/customer.module";
import { AccountsPayableModule } from "./accounts_payable/accountsPayable.module";
import { UserModule } from "./user/user.module";
import { ProductModule } from "./product/product.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    AuthModule,
    CustomerModule,
    AccountsPayableModule,
    UserModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModules {}
