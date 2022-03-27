import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreateAndUpdateDatesPostLikes1648360502158 implements MigrationInterface {
  name = 'AddCreateAndUpdateDatesPostLikes1648360502158';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user_posts_like" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()');
    await queryRunner.query('ALTER TABLE "user_posts_like" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user_posts_like" DROP COLUMN "updatedAt"');
    await queryRunner.query('ALTER TABLE "user_posts_like" DROP COLUMN "createdAt"');
  }
}
