import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDate,
} from "class-validator";
import { Type } from "class-transformer";
import { Status } from "../../../enum/status.enum";

export class CreateAccountsPayableDTO {
  @IsEnum(Status)
  status: Status;

  @IsDate()
  @Type(() => Date) // Transforma o valor recebido em uma instância de Date
  maturity: Date; // Vencimento

  @IsNumber()
  value: number; // Valor

  @IsString()
  regarding: string; // Referente a

  @IsString()
  supplier: string; // Fornecedor

  @IsString()
  type: string; // Tipo

  @IsNumber()
  day: number; // Dias

  @IsString()
  monthWeek: string; // Mês/Semana

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  paid?: Date; // Pago em (opcional)
}
