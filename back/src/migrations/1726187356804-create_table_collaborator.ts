import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableCollaborator1726187356804 implements MigrationInterface {
    name = 'CreateTableCollaborator1726187356804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."collaborator_gender_enum" AS ENUM('Male', 'Female', 'Other', 'Not Specified')`);
        await queryRunner.query(`CREATE TABLE "collaborator" ("id" SERIAL NOT NULL, "fullName" character varying(255) NOT NULL, "socialName" character varying(255), "gender" "public"."collaborator_gender_enum" NOT NULL DEFAULT 'Not Specified', "nationality" character varying(100) NOT NULL, "educationLevel" character varying(100) NOT NULL, "residentialAddress" character varying(255) NOT NULL, "position" character varying(100) NOT NULL, "workSchedule" character varying(100) NOT NULL, "workplaceLocation" character varying(100) NOT NULL, "activated" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_aa48142926d7bdb485d21ad2696" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "collaborator"`);
        await queryRunner.query(`DROP TYPE "public"."collaborator_gender_enum"`);
    }

}
