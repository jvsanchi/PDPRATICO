import { Module } from "@nestjs/common";
import { CustomerModule } from "./customer/customer.module";
import { AccountsPayableModule } from "./accounts_payable/accountsPayable.module";

@Module({
  imports: [CustomerModule, AccountsPayableModule],
  controllers: [],
  providers: [],
})
export class AppModules {}
