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

  // Create - POST /accounts-payable
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAccountsPayableDto: CreateAccounutsPayableDTO) {
    return this.accountsPayableService.create(createAccountsPayableDto);
  }

  // Read All - GET /accounts-payable
  @Get()
  findAll() {
    return this.accountsPayableService.findAll();
  }

  // Read One by ID - GET /accounts-payable/:id
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.accountsPayableService.findOne(id);
  }

  // Update - PATCH /accounts-payable/:id
  @Patch(":id")
  update(@Param("id") id: number, @Body() updateAccountsPayableDto: any) {
    return this.accountsPayableService.update(id, updateAccountsPayableDto);
  }

  // Delete - DELETE /accounts-payable/:id
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: number) {
    return this.accountsPayableService.remove(id);
  }
}
