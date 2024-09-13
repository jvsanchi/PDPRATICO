import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: "administrator" })
export class AdministratorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column()
  password: string;

  @Column({ name: "activated", default: true })
  // Status de ativação
  activated: boolean;

  @Column({
    name: "created_at",
  })
  // Data de criação
  created_at: Date;

  @Column({
    name: "updated_at",
  })
  // Data de atualização
  updated_at: Date;

  // Relacionamento com UserEntity
  @OneToMany(() => UserEntity, (user) => user.administrator)
  users: UserEntity[];
}
