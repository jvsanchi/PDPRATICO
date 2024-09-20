import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";
import { AdministratorEntity } from "./administrator.entity";

@Entity({ name: "roles" })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", unique: true })
  role: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];

  @OneToMany(() => UserEntity, (adminstrator) => adminstrator.role)
  admin: AdministratorEntity[];
}
