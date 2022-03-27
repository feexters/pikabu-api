import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserCommentsBookmarks1648402832115 implements MigrationInterface {
  name = 'AddUserCommentsBookmarks1648402832115';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "user_comments_bookmarks" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "commentId" uuid NOT NULL, CONSTRAINT "PK_0b0ef667ccf5fc7532ef911c2ec" PRIMARY KEY ("userId", "commentId"))',
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX "UNIQUE_USER_COMMENT_BOOKMARK" ON "user_comments_bookmarks" ("userId", "commentId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "user_comments_bookmarks" ADD CONSTRAINT "FK_8b64c4ec57ff368915614294c3c" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_comments_bookmarks" ADD CONSTRAINT "FK_19ee7b7f7552a564c2243d852bc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user_comments_bookmarks" DROP CONSTRAINT "FK_19ee7b7f7552a564c2243d852bc"');
    await queryRunner.query('ALTER TABLE "user_comments_bookmarks" DROP CONSTRAINT "FK_8b64c4ec57ff368915614294c3c"');
    await queryRunner.query('DROP INDEX "public"."UNIQUE_USER_COMMENT_BOOKMARK"');
    await queryRunner.query('DROP TABLE "user_comments_bookmarks"');
  }
}
