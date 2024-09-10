import { Module } from "@nestjs/common";
import { CustomerModule } from "./customer/customer.module";
import { AccountsPayableModule } from "./accounts_payable/accountsPayable.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [AuthModule, CustomerModule, AccountsPayableModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModules {}
