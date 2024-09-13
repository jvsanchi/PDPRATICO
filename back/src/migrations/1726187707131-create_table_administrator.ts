import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableAdministrator1726187707131 implements MigrationInterface {
    name = 'CreateTableAdministrator1726187707131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "administrator" ("id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying NOT NULL, "activated" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "UQ_be0ce9bef56d5a30b9e57525643" UNIQUE ("email"), CONSTRAINT "PK_ee58e71b3b4008b20ddc7b3092b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "collaborator" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "collaborator" ADD CONSTRAINT "FK_2b516ff163b9e85cb9adecc76c8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collaborator" DROP CONSTRAINT "FK_2b516ff163b9e85cb9adecc76c8"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "collaborator" DROP COLUMN "user_id"`);
        await queryRunner.query(`DROP TABLE "administrator"`);
    }

}
