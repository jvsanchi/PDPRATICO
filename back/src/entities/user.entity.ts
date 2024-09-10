import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AccountsPayable } from "./accountsPayable.entity";
import { CustomerEntity } from "./customer.entity";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => AccountsPayable, (accountsPayable) => accountsPayable.user)
  accountsPayable: AccountsPayable[];

  @OneToMany(() => CustomerEntity, (customer) => customer.user)
  customer: CustomerEntity[];

  @Column({ name: "name" })
  name: string;

  @Column({ name: "email" })
  email: string;

  @Column({ name: "password" })
  password: string;

  @Column({ name: "activated", default: true })
  activated: boolean;

  @Column({ name: "created_at" })
  created_at: Date;

  @Column({ name: "updated_at" })
  updated_at: Date;
}
