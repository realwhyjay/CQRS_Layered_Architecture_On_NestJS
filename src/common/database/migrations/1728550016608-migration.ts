import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1728550016608 implements MigrationInterface {
    name = 'Migration1728550016608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying(256) NOT NULL, "last_name" character varying(256) NOT NULL, "phone" character varying(16) NOT NULL, "email" character varying(128) NOT NULL, "refresh_token" text NOT NULL, "google_refresh_token" text NOT NULL, "gender" character(1) NOT NULL, "created_at" date NOT NULL DEFAULT now(), "updated_at" date NOT NULL DEFAULT now(), "deleted_at" date, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board" ("id" SERIAL NOT NULL, "title" character varying(128) NOT NULL, "content" text NOT NULL, "user_id" integer NOT NULL, "created_at" date NOT NULL DEFAULT now(), "updated_at" date NOT NULL DEFAULT now(), "deleted_at" date, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_b157cf902abe253a55961e8920b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_b157cf902abe253a55961e8920b"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
