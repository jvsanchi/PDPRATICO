import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { StockLimits } from "src/app/product/dto/stock-limits";

@Entity({ name: "products" })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eanGtin: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  photo: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  subcategory: string;

  @Column()
  brand: string;

  @Column()
  location: string;

  @Column("decimal")
  salePrice: number;

  @Column("decimal")
  costPrice: number;

  @Column("int")
  stock: number;

  @Column()
  unitOfMeasure: string;

  @Column({ type: "json", nullable: true })
  stockLimits: StockLimits;

  @Column({ type: "text", nullable: true })
  notes: string;

  @ManyToOne(() => UserEntity, (user) => user.products)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
