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
    default: Status.A_VENCER,
  })
  status: Status;

  @ManyToOne(() => UserEntity, (user) => user.accountsPayable)
  user: UserEntity;

  @Column({ name: "maturity", type: "date" })
  maturity: Date;

  @Column({ name: "value", type: "decimal", precision: 10, scale: 2 })
  value: number;

  @Column({ name: "regarding" })
  regarding: string;

  @Column({ name: "supplier" })
  supplier: string;

  @Column({ name: "type" })
  type: string;

  @Column({ name: "day" })
  day: number;

  @Column({ name: "monthWeek" })
  monthWeek: string;

  @Column({ name: "paid", type: "date", nullable: true })
  paid: Date;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
