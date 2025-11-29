import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ensureDatabaseExists } from './database/database.utils';

async function bootstrap() {
  await ensureDatabaseExists();
  // Create Nest application
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server is running at http://localhost:${port}`);

}
bootstrap();
