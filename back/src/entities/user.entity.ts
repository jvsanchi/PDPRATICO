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
import { ProductEntity } from "./product.entity";
import { CollaboratorEntity } from "./collaborator.entity";
import { AdministratorEntity } from "./administrator.entity";

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

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
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

  // Relacionamento com CollaboratorEntity
  @OneToMany(() => CollaboratorEntity, (collaborator) => collaborator.user)
  collaborators: CollaboratorEntity[];

  // Relacionamento com AdministratorEntity
  @ManyToOne(() => AdministratorEntity, (administrator) => administrator.users)
  @JoinColumn({ name: "administrator_id" })
  administrator: AdministratorEntity;
}
