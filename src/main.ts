import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards';
import { TransformPipe } from './common/pipes/transform.pipe';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));

  app.useGlobalPipes(new TransformPipe());

  await app.listen(5000);
}
bootstrap();
