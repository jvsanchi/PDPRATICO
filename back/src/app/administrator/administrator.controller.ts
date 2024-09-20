import { Body, Controller, Post } from "@nestjs/common";
import { AdministratorService } from "./administrator.service";
import { AdministratorDto } from "./dto/administrator.dto";

@Controller("administrator")
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  @Post("create")
  async createAdministrator(
    @Body() administratorDto: AdministratorDto,
  ): Promise<any> {
    return this.administratorService.createAdministrator(administratorDto);
  }
}
