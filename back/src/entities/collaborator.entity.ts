// src/collaborator/collaborator.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Gender } from "src/enum/gender.enum";
import { UserEntity } from "./user.entity"; // Ajuste o caminho conforme a estrutura do seu projeto

@Entity({ name: "collaborator" })
export class CollaboratorEntity {
  @PrimaryGeneratedColumn()
  // ID único do colaborador
  id: number;

  @Column({ length: 255 })
  // Nome completo do colaborador
  fullName: string;

  @Column({ length: 255, nullable: true })
  // Nome social, se solicitado
  socialName?: string;

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.NOT_SPECIFIED,
  })
  // Sexo
  gender: Gender;

  @Column({ length: 100 })
  // Nacionalidade
  nationality: string;

  @Column({ length: 100 })
  // Nível de escolaridade
  educationLevel: string;

  @Column({ length: 255 })
  // Endereço residencial
  residentialAddress: string;

  @Column({ length: 100 })
  // Cargo e função
  position: string;

  @Column({ length: 100 })
  // Jornada de trabalho
  workSchedule: string;

  @Column({ length: 100 })
  // Local de trabalho
  workplaceLocation: string;

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

  @ManyToOne(() => UserEntity, (user) => user.collaborators)
  @JoinColumn({ name: "user_id" })
  // Usuário que criou o colaborador
  user: UserEntity;
}
