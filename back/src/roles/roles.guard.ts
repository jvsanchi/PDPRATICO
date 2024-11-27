import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles.decorator";
import { JwtService } from "@nestjs/jwt";
import { RoleEnum } from "src/enum/roles.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true; // Se não houver restrição de papel, liberar acesso
    }

    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization) {
      return false;
    }

    const token = authorization.replace("Bearer ", "");
    const user = this.jwtService.decode(token) as any;

    if (!user || !user.roles) {
      return false;
    }

    // Verifica se o usuário tem pelo menos um dos papéis requeridos
    return requiredRoles.includes(user.roles.role as RoleEnum);
  }
}
