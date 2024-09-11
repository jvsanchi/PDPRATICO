import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";
import { RoleEnum } from "../enum/roles.enum"; // Enum de roles

@Entity({ name: "roles" })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: RoleEnum, unique: true })
  role: RoleEnum;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
