import { join } from 'path';

import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';

@Injectable()
export class GraphQLConfigService implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      sortSchema: true,
      fieldResolverEnhancers: ['interceptors'],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    };
  }
}
