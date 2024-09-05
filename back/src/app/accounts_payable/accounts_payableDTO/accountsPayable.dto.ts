import { IsString, IsEnum, IsNumber, IsOptional } from "class-validator";

import { Status } from "../../../enum/status.enum";

export class CreateAccounutsPayableDTO {
  @IsEnum(Status)
  status: Status;

  @IsString()
  maturity: string; // Vencimento

  @IsString()
  value: string; // Valor

  @IsString()
  regarding: string; // Referente a

  @IsString()
  supplier: string; // Fornecedor

  @IsString()
  type: string; // Tipo

  @IsNumber()
  day: number; // Dias

  @IsString()
  monthWeek: string; // Mês Semana

  @IsString()
  @IsOptional()
  Paid?: string; // Pago em (opcional)
}
