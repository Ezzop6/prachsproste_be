import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from 'config/appConfig';
import { typeOrmConfig } from 'config/typeOrmConfig.config';
import { ApiSwagger } from './app.api-swagger';
import { ValidationPipe } from '@nestjs/common';

if (appConfig.env !== 'development' && typeOrmConfig.synchronize === true) {
  throw new Error('You cannot use synchronize in production');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  new ApiSwagger().setup(app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors();
  await app.listen(appConfig.port);
  console.log(`Application is in ${appConfig.env} mode`);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Api documentation is running on: ${await app.getUrl()}/api`);
}
bootstrap();
