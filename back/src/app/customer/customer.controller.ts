import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CreateCustomerDTO } from "./customerDTO/customer.dto";
import { ApiTags } from "@nestjs/swagger";
import { DisableCustomerDTO } from "./customerDTO/disable-customer.dto";
import { EnableCustomerDTO } from "./customerDTO/enable-customer.dto";

@ApiTags("Customer")
@Controller("customer")
export class CustomerController {
  constructor(readonly customerService: CustomerService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.customerService.findAll();
  }

  @Post()
  async createCustomer(
    @Body() createCustomer: CreateCustomerDTO,
  ): Promise<any> {
    return this.customerService.createCustome(createCustomer);
  }

  @Delete("disabled")
  async disableCustomer(
    @Body() disableCustomerDto: DisableCustomerDTO,
  ): Promise<any> {
    return this.customerService.disableCustomer(disableCustomerDto.email);
  }

  @Patch("enabled")
  async enableCustomer(
    @Body() enableCustomerDto: EnableCustomerDTO,
  ): Promise<any> {
    return this.customerService.activedCustomer(enableCustomerDto.email);
  }
}
