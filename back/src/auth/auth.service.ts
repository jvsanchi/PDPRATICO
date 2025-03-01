import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/auth.dto";
import { UserService } from "src/app/user/user.service";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { email: user.email, sub: user.id, roles: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async generateToken(user: UserEntity): Promise<{ accessToken: string }> {
    const payload = { sub: user.id, role: user.role.role }; // Inclua a role no payload
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
