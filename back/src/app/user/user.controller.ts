import { Body, Controller, Delete, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { DisableUserDTO } from "./dto/disable-user.dto copy";
import { UpdateUserDTO } from "./dto/update-user.dto copy";

@ApiTags("Users")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  async findAll(): Promise<any> {
    return this.userService.findAll();
  }

  @Post()
  async createUser(@Body() createUser: CreateUserDTO): Promise<any> {
    return this.userService.createUser(createUser);
  }

  @Patch()
  async updateUser(@Body() updateUserDTO: UpdateUserDTO): Promise<any> {
    return this.userService.updateUser(updateUserDTO);
  }

  @Delete()
  async disableUser(disableUserDTO: DisableUserDTO): Promise<any> {
    return this.userService.disableUser(disableUserDTO.email);
  }
}
