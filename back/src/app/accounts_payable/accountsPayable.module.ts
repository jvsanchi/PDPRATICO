import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AccountsPayable } from "src/entities/accountsPayable.entity";
import { AccountsPayableController } from "./accountsPayable.controller";
import { AccountsPayableService } from "./accountsPayable.service";
import { AuthModule } from "src/auth/auth.module";
import { JwtConfigModule } from "src/auth/JwtConfig.module";


@Module({
  imports: [
    TypeOrmModule.forFeature([AccountsPayable]),
    AuthModule,
    JwtConfigModule,
  ],
  controllers: [AccountsPayableController],
  providers: [AccountsPayableService],
  exports: [AccountsPayableService],
})
export class AccountsPayableModule {}
