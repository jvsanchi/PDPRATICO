import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1726184941812 implements MigrationInterface {
  name = "CreateTables1726184941812";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '"2024-09-12T23:49:04.804Z"'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '2024-09-12 22:10:12.817'`,
    );
  }
}
