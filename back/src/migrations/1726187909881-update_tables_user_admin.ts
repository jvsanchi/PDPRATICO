import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTablesUserAdmin1726187909881 implements MigrationInterface {
    name = 'UpdateTablesUserAdmin1726187909881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "administrator_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_faadf972c01730230fc94c029e9" FOREIGN KEY ("administrator_id") REFERENCES "administrator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_faadf972c01730230fc94c029e9"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "administrator_id"`);
    }

}
