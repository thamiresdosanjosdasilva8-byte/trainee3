import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initDatabase } from './bancoDados/init';

async function bootstrap() {
  await initDatabase();

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
