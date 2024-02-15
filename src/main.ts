import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from 'config/appConfig';
import { typeOrmConfig } from 'config/typeOrmConfig.config';

if (appConfig.env !== 'development' && typeOrmConfig.synchronize === true) {
  throw new Error('You cannot use synchronize in production');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(appConfig.port);
  console.log(`Application is in ${appConfig.env} mode`);
}
bootstrap();
