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
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLConfigService } from './common/services/graphql-config.service';
import { ApolloDriver } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { ScalarsModule } from './common/modules/scalars.module';

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
    GraphQLModule.forRootAsync({
      useClass: GraphQLConfigService,
      driver: ApolloDriver,
    }),
    UsersModule,
    PostsModule,
    CommentsModule,
    CommentMediaModule,
    PostMediaModule,
    AuthModule,
    ScalarsModule,
  ],
})
export class AppModule {}
