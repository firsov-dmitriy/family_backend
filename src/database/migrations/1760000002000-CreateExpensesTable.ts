import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExpensesTable1760000002000 implements MigrationInterface {
  name = 'CreateExpensesTable1760000002000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "expenses" (
        "id" SERIAL NOT NULL,
        "category_id" integer NOT NULL,
        "day" smallint NOT NULL,
        "month" smallint NOT NULL,
        "amount" numeric(12,2) NOT NULL,
        "comment" character varying(500),
        CONSTRAINT "PK_expenses_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_expenses_category_id" FOREIGN KEY ("category_id") REFERENCES "expense_categories"("id") ON DELETE RESTRICT ON UPDATE NO ACTION,
        CONSTRAINT "CHK_expenses_day" CHECK ("day" >= 1 AND "day" <= 31),
        CONSTRAINT "CHK_expenses_month" CHECK ("month" >= 1 AND "month" <= 12)
      )
    `);

    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "IDX_expenses_category_id" ON "expenses" ("category_id")',
    );
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "IDX_expenses_month" ON "expenses" ("month")',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_expenses_month"');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_expenses_category_id"');
    await queryRunner.query('DROP TABLE IF EXISTS "expenses"');
  }
}
