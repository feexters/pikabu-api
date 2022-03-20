import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './common/services/typeorm-config.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { CommentMediaModule } from './comment-media/comment-media.module';
import { PostMediaModule } from './post-media/post-media.module';
import * as configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration.configuration],
      validationSchema: configuration.validationSchema,
      validationOptions: configuration.validationOptions,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    PostsModule,
    CommentsModule,
    CommentMediaModule,
    PostMediaModule,
  ],
})
export class AppModule {}
