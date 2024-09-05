import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AccountsPayable } from "src/entities/accountsPayable.entity";
import { AccountsPayableController } from "./accountsPayable.controller";
import { AccountsPayableService } from "./accountsPayable.service";

@Module({
  imports: [TypeOrmModule.forFeature([AccountsPayable])], // Importa o repositório da entidade
  controllers: [AccountsPayableController], // Registra o controller
  providers: [AccountsPayableService], // Registra o serviço
  exports: [AccountsPayableService],
})
export class AccountsPayableModule {}
