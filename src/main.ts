import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformPipe } from './common/pipes/transform.pipe';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new TransformPipe());

  await app.listen(5000);
}
bootstrap();
