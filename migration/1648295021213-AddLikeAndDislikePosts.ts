import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLikeAndDislikePosts1648295021213 implements MigrationInterface {
  name = 'AddLikeAndDislikePosts1648295021213';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TYPE "public"."user_posts_like_type_enum" AS ENUM(\'LIKE\', \'DISLIKE\')');
    await queryRunner.query(
      'CREATE TABLE "user_posts_like" ("userId" uuid NOT NULL, "postId" uuid NOT NULL, "type" "public"."user_posts_like_type_enum", CONSTRAINT "PK_7ac0acdd74a8e6c323eeea13f4f" PRIMARY KEY ("userId", "postId"))',
    );
    await queryRunner.query('CREATE UNIQUE INDEX "UNIQUE_USER_AND_POST_ID" ON "user_posts_like" ("userId", "postId") ');
    await queryRunner.query('ALTER TABLE "posts" ADD "likesCount" integer NOT NULL DEFAULT \'0\'');
    await queryRunner.query('ALTER TABLE "posts" ADD "dislikesCount" integer NOT NULL DEFAULT \'0\'');
    await queryRunner.query(
      'ALTER TABLE "user_posts_like" ADD CONSTRAINT "FK_d204c36e576f0868f656a3fd734" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_posts_like" ADD CONSTRAINT "FK_6bee70985b36956b7507d586a44" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user_posts_like" DROP CONSTRAINT "FK_6bee70985b36956b7507d586a44"');
    await queryRunner.query('ALTER TABLE "user_posts_like" DROP CONSTRAINT "FK_d204c36e576f0868f656a3fd734"');
    await queryRunner.query('ALTER TABLE "posts" DROP COLUMN "dislikesCount"');
    await queryRunner.query('ALTER TABLE "posts" DROP COLUMN "likesCount"');
    await queryRunner.query('DROP INDEX "public"."UNIQUE_USER_AND_POST_ID"');
    await queryRunner.query('DROP TABLE "user_posts_like"');
    await queryRunner.query('DROP TYPE "public"."user_posts_like_type_enum"');
  }
}
