import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { CreateAccounutsPayableDTO } from "./accounts_payableDTO/accountsPayable.dto";
import { AccountsPayableService } from "./accountsPayable.service";

@Controller("accounts-payable")
export class AccountsPayableController {
  constructor(
    private readonly accountsPayableService: AccountsPayableService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAccountsPayableDto: CreateAccounutsPayableDTO) {
    return this.accountsPayableService.create(createAccountsPayableDto);
  }

  @Get()
  findAll() {
    return this.accountsPayableService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.accountsPayableService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateAccountsPayableDto: any) {
    return this.accountsPayableService.update(id, updateAccountsPayableDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: number) {
    return this.accountsPayableService.remove(id);
  }
}
