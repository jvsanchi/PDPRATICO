import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRolesAdm1726766600967 implements MigrationInterface {
    name = 'AddRolesAdm1726766600967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "administrator" ADD "role_id" integer`);
        await queryRunner.query(`ALTER TABLE "administrator" ADD CONSTRAINT "FK_dba5c61b63d2e937f71b2e30e2e" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "administrator" DROP CONSTRAINT "FK_dba5c61b63d2e937f71b2e30e2e"`);
        await queryRunner.query(`ALTER TABLE "administrator" DROP COLUMN "role_id"`);
    }

}
