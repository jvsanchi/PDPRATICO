import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1740667551299 implements MigrationInterface {
    name = ' $npmConfigName1740667551299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_ccc7c1489f3a6b3c9b47d4537c5" UNIQUE ("role"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "observations" character varying NOT NULL, "dateOfBirth" character varying NOT NULL, "rg" character varying NOT NULL, "ie" character varying NOT NULL, "cpf" character varying NOT NULL, "cnpj" character varying NOT NULL, "address" character varying NOT NULL, "telephone" character varying NOT NULL, "email" character varying NOT NULL, "activated" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "eanGtin" character varying NOT NULL, "name" character varying NOT NULL, "photo" character varying, "category" character varying NOT NULL, "subcategory" character varying, "brand" character varying NOT NULL, "location" character varying NOT NULL, "salePrice" numeric NOT NULL, "costPrice" numeric NOT NULL, "stock" integer NOT NULL, "unitOfMeasure" character varying NOT NULL, "stockLimits" json, "notes" text, "user_id" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."collaborator_gender_enum" AS ENUM('Male', 'Female', 'Other', 'Not Specified')`);
        await queryRunner.query(`CREATE TABLE "collaborator" ("id" SERIAL NOT NULL, "fullName" character varying(255) NOT NULL, "socialName" character varying(255), "gender" "public"."collaborator_gender_enum" NOT NULL DEFAULT 'Not Specified', "nationality" character varying(100) NOT NULL, "educationLevel" character varying(100) NOT NULL, "residentialAddress" character varying(255) NOT NULL, "position" character varying(100) NOT NULL, "workSchedule" character varying(100) NOT NULL, "workplaceLocation" character varying(100) NOT NULL, "activated" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "user_id" integer, CONSTRAINT "PK_aa48142926d7bdb485d21ad2696" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "activated" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "role_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."accountsPayable_status_enum" AS ENUM('a vencer', 'pago', 'vencida')`);
        await queryRunner.query(`CREATE TABLE "accountsPayable" ("id" SERIAL NOT NULL, "status" "public"."accountsPayable_status_enum" NOT NULL DEFAULT 'a vencer', "maturity" date NOT NULL, "value" numeric(10,2) NOT NULL, "regarding" character varying NOT NULL, "supplier" character varying NOT NULL, "type" character varying NOT NULL, "day" integer NOT NULL, "monthWeek" character varying NOT NULL, "paid" date, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_f2ba8277e6c2e144bcfefd873ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "administrator" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying NOT NULL, "activated" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "UQ_be0ce9bef56d5a30b9e57525643" UNIQUE ("email"), CONSTRAINT "PK_ee58e71b3b4008b20ddc7b3092b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_3f62b42ed23958b120c235f74df" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collaborator" ADD CONSTRAINT "FK_2b516ff163b9e85cb9adecc76c8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accountsPayable" ADD CONSTRAINT "FK_f04df4a1f3a4a2edf53db8059df" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accountsPayable" DROP CONSTRAINT "FK_f04df4a1f3a4a2edf53db8059df"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "collaborator" DROP CONSTRAINT "FK_2b516ff163b9e85cb9adecc76c8"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_3f62b42ed23958b120c235f74df"`);
        await queryRunner.query(`DROP TABLE "administrator"`);
        await queryRunner.query(`DROP TABLE "accountsPayable"`);
        await queryRunner.query(`DROP TYPE "public"."accountsPayable_status_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "collaborator"`);
        await queryRunner.query(`DROP TYPE "public"."collaborator_gender_enum"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
