import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategoryMonthlyLimitsTable1760000004000 implements MigrationInterface {
  name = 'CreateCategoryMonthlyLimitsTable1760000004000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "category_monthly_limits" (
        "id" SERIAL NOT NULL,
        "month" smallint NOT NULL,
        "category_id" integer NOT NULL,
        "limit" numeric(12,2) NOT NULL,
        CONSTRAINT "PK_category_monthly_limits_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_category_monthly_limits_category_id" FOREIGN KEY ("category_id") REFERENCES "expense_categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT "UQ_category_monthly_limits_month_category" UNIQUE ("month", "category_id"),
        CONSTRAINT "CHK_category_monthly_limits_month" CHECK ("month" >= 1 AND "month" <= 12)
      )
    `);

    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "IDX_category_monthly_limits_category_id" ON "category_monthly_limits" ("category_id")',
    );
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "IDX_category_monthly_limits_month" ON "category_monthly_limits" ("month")',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_category_monthly_limits_month"');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_category_monthly_limits_category_id"');
    await queryRunner.query('DROP TABLE IF EXISTS "category_monthly_limits"');
  }
}
