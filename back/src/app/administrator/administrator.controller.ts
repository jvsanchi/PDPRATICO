import { Body, Controller, Post, Get } from "@nestjs/common";
import { AdministratorService } from "./administrator.service";
import { AdministratorDto } from "./dto/administrator.dto";

@Controller("administrator")
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  @Get()
  async findAllAdministrator(): Promise<any> {
    return this.administratorService.getAllAdministrator();
  }

  @Post("create")
  async createAdministrator(
    @Body() administratorDto: AdministratorDto,
  ): Promise<any> {
    return this.administratorService.createAdministrator(administratorDto);
  }
}
