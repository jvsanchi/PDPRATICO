// src/utils/bcrypt.util.ts
import * as bcrypt from "bcrypt";

export class BcryptUtil {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Número de rodadas para gerar o salt
    return await bcrypt.hash(password, saltRounds);
  }

  static async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async validateUser(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await BcryptUtil.comparePassword(plainPassword, hashedPassword);
  }
}
