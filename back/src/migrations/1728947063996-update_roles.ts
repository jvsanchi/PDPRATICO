import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRoles1728947063996 implements MigrationInterface {
    name = 'UpdateRoles1728947063996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_faadf972c01730230fc94c029e9"`);
        await queryRunner.query(`ALTER TABLE "administrator" DROP CONSTRAINT "FK_dba5c61b63d2e937f71b2e30e2e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "administrator_id"`);
        await queryRunner.query(`ALTER TABLE "administrator" DROP COLUMN "role_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "administrator" ADD "role_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "administrator_id" integer`);
        await queryRunner.query(`ALTER TABLE "administrator" ADD CONSTRAINT "FK_dba5c61b63d2e937f71b2e30e2e" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_faadf972c01730230fc94c029e9" FOREIGN KEY ("administrator_id") REFERENCES "administrator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
