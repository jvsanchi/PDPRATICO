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
  UseGuards,
} from "@nestjs/common";
import { CreateAccountsPayableDTO } from "./accounts_payableDTO/accountsPayable.dto";
import { AccountsPayableService } from "./accountsPayable.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RoleEnum } from "src/enum/roles.enum";
import { RolesGuard } from "src/roles/roles.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/roles/roles.decorator";

@ApiBearerAuth()
@ApiTags("accounts-payable")
@Controller("accounts-payable")
export class AccountsPayableController {
  constructor(
    private readonly accountsPayableService: AccountsPayableService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.MASTER, RoleEnum.ADMIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAccountsPayableDto: CreateAccountsPayableDTO) {
    return this.accountsPayableService.create(createAccountsPayableDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.MASTER, RoleEnum.ADMIN, RoleEnum.COLLABORATOR)
  @Get()
  findAll() {
    return this.accountsPayableService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.MASTER, RoleEnum.ADMIN, RoleEnum.COLLABORATOR)
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.accountsPayableService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.MASTER, RoleEnum.ADMIN)
  @Patch(":id")
  update(@Param("id") id: number, @Body() updateAccountsPayableDto: any) {
    return this.accountsPayableService.update(id, updateAccountsPayableDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.MASTER, RoleEnum.ADMIN)
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: number) {
    return this.accountsPayableService.remove(id);
  }
}
