import { Body, Controller, Get, Post } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CreateCustomerDTO } from "./customerDTO/customer.dto";

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
}
