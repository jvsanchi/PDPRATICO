import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableRoles1726757748848 implements MigrationInterface {
    name = 'AlterTableRoles1726757748848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "UQ_ccc7c1489f3a6b3c9b47d4537c5"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."roles_role_enum"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "UQ_ccc7c1489f3a6b3c9b47d4537c5" UNIQUE ("role")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "UQ_ccc7c1489f3a6b3c9b47d4537c5"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."roles_role_enum" AS ENUM('ADMIN', 'MASTER', 'USER', 'MANAGER', 'COLLABORATOR')`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "role" "public"."roles_role_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "UQ_ccc7c1489f3a6b3c9b47d4537c5" UNIQUE ("role")`);
    }

}
