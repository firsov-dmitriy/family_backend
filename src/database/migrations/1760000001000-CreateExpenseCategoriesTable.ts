import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExpenseCategoriesTable1760000001000 implements MigrationInterface {
  name = 'CreateExpenseCategoriesTable1760000001000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "expense_categories" (
        "id" SERIAL NOT NULL,
        "name" character varying(120) NOT NULL,
        CONSTRAINT "UQ_expense_categories_name" UNIQUE ("name"),
        CONSTRAINT "PK_expense_categories_id" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "expense_categories"');
  }
}
