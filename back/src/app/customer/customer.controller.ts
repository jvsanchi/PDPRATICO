import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CreateCustomerDTO } from "./customerDTO/customer.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DisableCustomerDTO } from "./customerDTO/disable-customer.dto";
import { EnableCustomerDTO } from "./customerDTO/enable-customer.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/roles/roles.guard";
import { RoleEnum } from "src/enum/roles.enum";
import { Roles } from "src/roles/roles.decorator";
@ApiBearerAuth()
@ApiTags("Customer")
@Controller("customer")
export class CustomerController {
  constructor(readonly customerService: CustomerService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.MASTER, RoleEnum.ADMIN, RoleEnum.COLLABORATOR)
  @Get()
  async findAll(): Promise<any> {
    return this.customerService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.MASTER, RoleEnum.ADMIN, RoleEnum.COLLABORATOR)
  @Post()
  async createCustomer(
    @Body() createCustomer: CreateCustomerDTO,
  ): Promise<any> {
    return this.customerService.createCustome(createCustomer);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.MASTER, RoleEnum.ADMIN)
  @Delete("disabled")
  async disableCustomer(
    @Body() disableCustomerDto: DisableCustomerDTO,
  ): Promise<any> {
    return this.customerService.disableCustomer(disableCustomerDto.email);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.MASTER, RoleEnum.ADMIN)
  @Patch("enabled")
  async enableCustomer(
    @Body() enableCustomerDto: EnableCustomerDTO,
  ): Promise<any> {
    return this.customerService.activedCustomer(enableCustomerDto.email);
  }
}
