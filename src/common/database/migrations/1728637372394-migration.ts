import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1728637372394 implements MigrationInterface {
  name = 'Migration1728637372394';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying(256) NOT NULL, "last_name" character varying(256) NOT NULL, "phone" character varying(16) NOT NULL, "email" character varying(128) NOT NULL, "created_at" date NOT NULL DEFAULT now(), "updated_at" date NOT NULL DEFAULT now(), "deleted_at" date, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
