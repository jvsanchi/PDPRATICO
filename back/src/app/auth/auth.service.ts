import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service"; // Serviço do usuário
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email); // Buscar o usuário pelo email
    if (user && (await bcrypt.compare(password, user.password))) {
      // Comparar a senha
      const { password, ...result } = user; // Excluir a senha do resultado
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password); // Validar o usuário
    if (!user) {
      throw new UnauthorizedException("Invalid credentials"); // Lançar uma exceção se não for encontrado
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload), // Gerar o token JWT
    };
  }
}
