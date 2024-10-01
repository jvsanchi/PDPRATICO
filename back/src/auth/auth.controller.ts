// src/auth/auth.controller.ts
import { Controller, Post, Body, Request, UseGuards, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/auth.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // Atualize para usar GET para buscar o perfil do usuário autenticado
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user; // Retorna as informações do usuário autenticado, incluindo o papel (role)
  }
}
