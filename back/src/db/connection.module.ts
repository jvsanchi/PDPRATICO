import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerEntity } from "../entities/customer.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.HOST,
      port: Number(process.env.PORT) || 5432,
      username: "root",
      password: "123456",
      database: "pdepratico",
      entities: [CustomerEntity],
      synchronize: true,
    }),
  ],
})
export class ConnectionModule {}
