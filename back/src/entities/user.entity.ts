import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { RoleEntity } from "./roles.entity";
import { CustomerEntity } from "./customer.entity";
import { AccountsPayable } from "./accountsPayable.entity";
import { ProductEntity } from "./product.entity"; // Importe a entidade ProductEntity

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  activated: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  // Relacionamento com RoleEntity
  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role: RoleEntity;

  // Relacionamento com CustomerEntity
  @OneToMany(() => CustomerEntity, (customer) => customer.user)
  customers: CustomerEntity[];

  // Relacionamento com AccountsPayable
  @OneToMany(() => AccountsPayable, (accountsPayable) => accountsPayable.user)
  accountsPayable: AccountsPayable[];

  // Relacionamento com ProductEntity
  @OneToMany(() => ProductEntity, (product) => product.user)
  products: ProductEntity[];
}
