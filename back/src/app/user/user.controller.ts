import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto copy";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../roles/roles.guard";
import { RoleEnum } from "src/enum/roles.enum";
import { Roles } from "../roles/roles.decorator";

@ApiTags("Users")
@ApiBearerAuth()
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.MASTER, RoleEnum.ADMIN)
  @Get()
  async findAll(): Promise<any> {
    return this.userService.findAll();
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(RoleEnum.MASTER)
  @Post("create")
  async createUser(@Body() createUser: CreateUserDTO): Promise<any> {
    return this.userService.createUser(createUser);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.MASTER, RoleEnum.ADMIN)
  @Patch()
  async updateUser(@Body() updateUserDTO: UpdateUserDTO): Promise<any> {
    return this.userService.updateUser(updateUserDTO);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.MASTER)
  @Delete()
  async disableUser(@Body("email") email: string): Promise<any> {
    return this.userService.disableUser(email);
  }
}