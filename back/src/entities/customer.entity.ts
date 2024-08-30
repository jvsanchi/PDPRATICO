import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "customer" })
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "code" })
  code: string;

  @Column({ name: "observations" })
  observations: string;

  @Column({ name: "dateOfBirth" })
  dateOfBirth: string;

  @Column({ name: "rg" })
  rg: string;

  @Column({ name: "ie" })
  ie: string;

  @Column({ name: "cpf" })
  cpf: string;

  @Column({ name: "cnpj" })
  cnpj: string;

  @Column({ name: "address" })
  address: string;

  @Column({ name: "telephone" })
  telephone: string;

  @Column({ name: "email" })
  email: string;

  @Column({ name: "activated", default: true })
  activated: boolean;

  @Column({ name: "created_at" })
  created_at: Date;

  @Column({ name: "updated_at" })
  updated_at: Date;
}
