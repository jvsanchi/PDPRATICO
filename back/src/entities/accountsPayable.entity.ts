import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../enum/status.enum";
import { CustomerEntity } from "./customer.entity";

@Entity({ name: "accountsPayable" })
export class AccountsPayable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.A_VENCER, // valor padrão
  })
  status: Status;

  @ManyToOne(() => CustomerEntity, (customer) => customer.id)
  customer: CustomerEntity;

  @Column({ name: "maturity" })
  maturity: string; //Vencimento

  @Column({ name: "value" })
  value: string; //Valor

  @Column({ name: "regarding" })
  regarding: string; //Referente a

  @Column({ name: "supplier" })
  supplier: string; //Fornecedor

  @Column({ name: "type" })
  type: string; //Tipo

  @Column({ name: "day" })
  day: number; //Dias

  @Column({ name: "monthWeek" })
  monthWeek: string; //Mês Semana

  @Column({ name: "paid" })
  paid: string; //Pago em

  @Column({ name: "created_at" })
  created_at: Date;

  @Column({ name: "updated_at" })
  updated_at: Date;
}
