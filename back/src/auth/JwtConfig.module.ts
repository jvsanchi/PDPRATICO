import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use a variável de ambiente para a chave secreta
      signOptions: { expiresIn: "60m" }, // Defina o tempo de expiração
    }),
  ],
  exports: [JwtModule], // Exporte o JwtModule para que outros módulos possam usar
})
export class JwtConfigModule {}
