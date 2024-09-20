import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterColumnNameAdm1726761406679 implements MigrationInterface {
    name = 'AlterColumnNameAdm1726761406679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "administrator" RENAME COLUMN "nome" TO "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "administrator" RENAME COLUMN "name" TO "nome"`);
    }

}
