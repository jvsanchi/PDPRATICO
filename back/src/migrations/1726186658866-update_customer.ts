import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCustomer1726186658866 implements MigrationInterface {
    name = 'UpdateCustomer1726186658866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '2024-09-12 23:49:04.804'`);
    }

}
