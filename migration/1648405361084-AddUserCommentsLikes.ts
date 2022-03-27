import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserCommentsLikes1648405361084 implements MigrationInterface {
  name = 'AddUserCommentsLikes1648405361084';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TYPE "public"."user_comments_like_type_enum" AS ENUM(\'LIKE\', \'DISLIKE\')');
    await queryRunner.query(
      'CREATE TABLE "user_comments_like" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "commentId" uuid NOT NULL, "type" "public"."user_comments_like_type_enum", CONSTRAINT "PK_56b63a4340879ad6b15b21f51e8" PRIMARY KEY ("userId", "commentId"))',
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX "UNIQUE_USER_AND_COMMENT_ID" ON "user_comments_like" ("userId", "commentId") ',
    );
    await queryRunner.query('ALTER TABLE "comments" ADD "likesCount" integer NOT NULL DEFAULT \'0\'');
    await queryRunner.query('ALTER TABLE "comments" ADD "dislikesCount" integer NOT NULL DEFAULT \'0\'');
    await queryRunner.query(
      'ALTER TABLE "user_comments_like" ADD CONSTRAINT "FK_34883edd5cbec8536526e492166" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_comments_like" ADD CONSTRAINT "FK_a986eac5edcb887e62bd37fc75d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user_comments_like" DROP CONSTRAINT "FK_a986eac5edcb887e62bd37fc75d"');
    await queryRunner.query('ALTER TABLE "user_comments_like" DROP CONSTRAINT "FK_34883edd5cbec8536526e492166"');
    await queryRunner.query('ALTER TABLE "comments" DROP COLUMN "dislikesCount"');
    await queryRunner.query('ALTER TABLE "comments" DROP COLUMN "likesCount"');
    await queryRunner.query('DROP INDEX "public"."UNIQUE_USER_AND_COMMENT_ID"');
    await queryRunner.query('DROP TABLE "user_comments_like"');
    await queryRunner.query('DROP TYPE "public"."user_comments_like_type_enum"');
  }
}
