import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
