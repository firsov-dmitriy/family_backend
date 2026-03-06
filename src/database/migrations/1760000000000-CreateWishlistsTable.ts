import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWishlistsTable1760000000000 implements MigrationInterface {
  name = 'CreateWishlistsTable1760000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "wishlists" (
        "id" SERIAL NOT NULL,
        "name" character varying(255) NOT NULL,
        "url" character varying(2048) NOT NULL,
        "city" character varying(120) NOT NULL,
        CONSTRAINT "PK_wishlists_id" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "wishlists"');
  }
}
