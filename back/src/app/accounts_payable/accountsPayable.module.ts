import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AccountsPayable } from "src/entities/accountsPayable.entity";
import { AccountsPayableController } from "./accountsPayable.controller";
import { AccountsPayableService } from "./accountsPayable.service";

@Module({
  imports: [TypeOrmModule.forFeature([AccountsPayable])],
  controllers: [AccountsPayableController],
  providers: [AccountsPayableService],
  exports: [AccountsPayableService],
})
export class AccountsPayableModule {}
