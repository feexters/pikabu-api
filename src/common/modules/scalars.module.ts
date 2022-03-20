import { Module } from '@nestjs/common';

import { UUIDScalar } from '../scalars/uuid.scalar';

@Module({
  providers: [UUIDScalar],
})
export class ScalarsModule {}
