import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Status } from "../enum/status.enum";
import { UserEntity } from "./user.entity";

@Entity({ name: "accountsPayable" })
export class AccountsPayable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.A_VENCER, // Valor padrão
  })
  status: Status;

  @ManyToOne(() => UserEntity, (user) => user.accountsPayable)
  user: UserEntity;

  @Column({ name: "maturity", type: "date" })
  maturity: Date; // Vencimento (usando Date)

  @Column({ name: "value", type: "decimal", precision: 10, scale: 2 })
  value: number; // Valor (usando number)

  @Column({ name: "regarding" })
  regarding: string; // Referente a

  @Column({ name: "supplier" })
  supplier: string; // Fornecedor

  @Column({ name: "type" })
  type: string; // Tipo

  @Column({ name: "day" })
  day: number; // Dias

  @Column({ name: "monthWeek" })
  monthWeek: string; // Mês/Semana

  @Column({ name: "paid", type: "date", nullable: true })
  paid: Date; // Pago em (usando Date e nullable para pagamentos pendentes)

  @CreateDateColumn({ name: "created_at" })
  created_at: Date; // Preenchido automaticamente

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date; // Preenchido automaticamente
}
