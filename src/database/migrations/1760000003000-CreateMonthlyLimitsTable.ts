import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMonthlyLimitsTable1760000003000 implements MigrationInterface {
  name = 'CreateMonthlyLimitsTable1760000003000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "monthly_limits" (
        "id" SERIAL NOT NULL,
        "month" smallint NOT NULL,
        "limit" numeric(12,2) NOT NULL,
        CONSTRAINT "UQ_monthly_limits_month" UNIQUE ("month"),
        CONSTRAINT "PK_monthly_limits_id" PRIMARY KEY ("id"),
        CONSTRAINT "CHK_monthly_limits_month" CHECK ("month" >= 1 AND "month" <= 12)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "monthly_limits"');
  }
}
